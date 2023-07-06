
import { ILogin } from "../../interfaces/userInterfaces/ILogin";
import { IRegister } from "../../interfaces/userInterfaces/IRegister";
import bcrypt from 'bcrypt';
import { User } from "../../entities/User";
import { AppDataSource } from "../../AppDataSource";
import { IServer } from "../../interfaces/serverInterfaces/IServer";
import { serverStatus } from "../../enums/serverStatusesEnums/serverStatus";
import { serverMSG } from "../../enums/serverStatusesEnums/serverMSG";
import { validationDAL } from "../../middleware/validateDAL";


export const loginOrRegisterDAL = {
  loginDAL: async (loginData: ILogin): Promise<IServer> => {
    const { email, phoneNumber } = loginData;
    let checkUser;
    if (email) {
      checkUser = await AppDataSource.manager.findOneBy(User, { email });
    } else {
      checkUser = await AppDataSource.manager.findOneBy(User, { phoneNumber });
    }
    if (!checkUser) {
      return {status: serverStatus.NotFound, data: {}, msg: serverMSG.NotFound}
    } else {
      return {status:serverStatus.Success, data: checkUser, msg: serverMSG.Success}
    }
  },

  registerDAL: async (registerData: IRegister): Promise<IServer> => {
    const { fullName, email, address, phoneNumber, password } = registerData;
    try {
      const newUser = AppDataSource.manager.create(User, {
        fullName: fullName,
        email: email,
        address: address,
        phoneNumber: phoneNumber,
        password: password,
        isStaff: false
      });
      try { 
        await newUser.save() 
        return {
          status: serverStatus.Created,
          data: newUser,
          msg:  serverMSG.Created 
        };
      } catch (error: any) {
        return {
          status: serverStatus.RequestFail,
          data: error.detail,
          msg: serverMSG.RequestFail
        };
      } 
    } catch (error: any) {
      console.error(`Error in ${loginOrRegisterDAL.registerDAL.name} Message: ${error.message}`, {
        functionName: loginOrRegisterDAL.registerDAL.name,
      });
      return {
        status: serverStatus.RequestFail,
        data: error.message,
        msg: serverMSG.RequestFail
      };
    }
  },
};