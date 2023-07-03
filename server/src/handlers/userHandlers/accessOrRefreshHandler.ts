import { accessOrRefreshDAL } from "../../DAL/userDAL/accessOrRefreshDAL";
import { ILogin } from "../../interfaces/userInterfaces/ILogin";
import { IRegister } from "../../interfaces/userInterfaces/IRegister";
import jwt, { Jwt } from 'jsonwebtoken';
import dotenv from "dotenv";
import IUser, { isIUser } from "../../interfaces/userInterfaces/IUser";
import { userTableEnum } from "../../enums/ORMEnums/userTableEnum";

dotenv.config();
const jwt_secret: string = process.env.JWT_SECRET

const generateAccessToken = (accessData: IUser): string  => {
  return jwt.sign(accessData, jwt_secret, { expiresIn: '5m' }); 
};
const generateRefreshToken = (userData: IUser): string  => {
  return jwt.sign({email: userData.email, password: userData.password}, jwt_secret, { expiresIn: '30d' });
};

export const accessOrRefreshHandler = {
  loginHandler: async (loginData: ILogin): Promise<void> => {
    const dalResult = await accessOrRefreshDAL.loginDAL(loginData)
    // if (retVal) {return generateRefreshToken(loginData)}
  },
  registerHandler: async (registerData: IRegister): Promise<string | false> => {
    const dalResult: IUser | Error  = await accessOrRefreshDAL.registerDAL(registerData)
    return isIUser(dalResult)? generateRefreshToken(dalResult) : false
  },
};