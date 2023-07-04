import { accessOrRefreshDAL } from "../../DAL/userDAL/accessOrRefreshDAL";
import { ILogin } from "../../interfaces/userInterfaces/ILogin";
import { IRegister } from "../../interfaces/userInterfaces/IRegister";
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
import IUser, { isIUser } from "../../interfaces/userInterfaces/IUser";
import { IServer } from "../../interfaces/serverInterfaces/IServer";
import { serverStatus } from "../../enums/serverStatusesEnums/serverStatus";

dotenv.config();
const jwt_secret: string = process.env.JWT_SECRET

const generateAccessToken = (userData: IUser): string  => {
  return jwt.sign({email: userData.email, password: userData.password}, jwt_secret, { expiresIn: '5m' }); 
};
const generateRefreshToken = (userData: IUser): string  => {
  return jwt.sign({email: userData.email, password: userData.password}, jwt_secret, { expiresIn: '30d' });
};

export const accessOrRefreshHandler = {
  loginHandler: async (loginData: ILogin): Promise<IServer> => {
    const dalResult: IServer = await accessOrRefreshDAL.loginDAL(loginData)
    return {
      status: dalResult.status === serverStatus.Success? serverStatus.Success:
        dalResult.status === serverStatus.NotFound? serverStatus.NotFound: serverStatus.Unauthorized, 
      data:  isIUser(dalResult.data)? {
        refreshToken: generateRefreshToken(dalResult.data),
        accessToken: generateAccessToken(dalResult.data)
      } : dalResult.data,
      msg: dalResult.msg
    }
  },
  registerHandler: async (registerData: IRegister): Promise<IServer> => {
    const dalResult: IServer = await accessOrRefreshDAL.registerDAL(registerData)
    return {
      status: dalResult.status === serverStatus.Success? serverStatus.Success : serverStatus.RequestFail, 
      data:  isIUser(dalResult.data)? {
        refreshToken: generateRefreshToken(dalResult.data),
        accessToken: generateAccessToken(dalResult.data)
      } : dalResult.data,
      msg: dalResult.msg
    }
  },
};