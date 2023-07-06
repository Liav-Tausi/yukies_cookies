import { loginOrRegisterDAL } from "../../DAL/userDAL/loginOrRegisterDAL";
import { ILogin } from "../../interfaces/userInterfaces/ILogin";
import { IRegister } from "../../interfaces/userInterfaces/IRegister";
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
import IUser, { isIUser } from "../../interfaces/userInterfaces/IUser";
import { IServer } from "../../interfaces/serverInterfaces/IServer";
import { serverStatus } from "../../enums/serverStatusesEnums/serverStatus";
import bcrypt from 'bcrypt';
import { AppDataSource } from "../../AppDataSource";
import { User } from "../../entities/User";
import { validationDAL } from "../../middleware/validateDAL";
import { serverMSG } from "../../enums/serverStatusesEnums/serverMSG";


dotenv.config();

if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable is not defined');
}
const jwt_secret: string = process.env.JWT_SECRET


const generateAccessToken = (userData: IUser): string  => {
  return jwt.sign({email: userData.email, password: userData.password}, jwt_secret, { expiresIn: '5m' }); 
};
const generateRefreshToken = (userData: IUser): string  => {
  return jwt.sign({email: userData.email, password: userData.password}, jwt_secret, { expiresIn: '30d' });
};

export const loginOrRegisterHandler = {
  loginHandler: async (loginData: ILogin): Promise<IServer> => {
    const dalResult: IServer = await loginOrRegisterDAL.loginDAL(loginData)

    if (isIUser(dalResult.data)) {
      if (await bcrypt.compare(loginData.password, dalResult.data.password)) {
        return {
          status: serverStatus.Success,
          data: {refreshToken: generateRefreshToken(dalResult.data), accessToken: generateAccessToken(dalResult.data)},
          msg: serverMSG.Success}
      } else if (dalResult.status === serverStatus.NotFound) {
        return {status: serverStatus.NotFound, data: {}, msg: serverMSG.NotFound}
      } else {
        return {status: serverStatus.Unauthorized, data: {}, msg: serverMSG.Unauthorized}
      }
    } else {
      return {status: serverStatus.NotFound, data: {}, msg: serverMSG.NotFound}
    }
  },
  registerHandler: async (registerData: IRegister): Promise<IServer> => {
    const { fullName, email, address, phoneNumber, password } = registerData;
    const validateUser = AppDataSource.manager.create(User, {fullName,email,phoneNumber,password,address,isStaff:false});
    const validationResult = await validationDAL(validateUser)

    if (validationResult.status === serverStatus.Success ) {
        registerData.password = await bcrypt.hash(password, 10);
        const dalResult: IServer = await loginOrRegisterDAL.registerDAL(registerData)
        if (dalResult.status === serverStatus.Created && isIUser(dalResult.data)) {
          return {
            status: serverStatus.Created, 
            data: {refreshToken: generateRefreshToken(dalResult.data), accessToken: generateAccessToken(dalResult.data)},
            msg: dalResult.msg
          }
        } else {
           return {
            status: serverStatus.RequestFail, 
            data: dalResult.data,
            msg: serverMSG.RequestFail
          }
        }  
    } else {
       return {
          status: serverStatus.RequestFail, 
          data: validationResult,
          msg: serverMSG.RequestFail
      }
    }
  },
};