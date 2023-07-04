
import { ILogin } from "../../interfaces/userInterfaces/ILogin";
import { IRegister } from "../../interfaces/userInterfaces/IRegister";
import { createHash } from 'crypto';
import bcrypt from 'bcrypt';
import { User } from "../../entities/User";
import { AppDataSource } from "../../AppDataSource";
import { IServer } from "../../interfaces/serverInterfaces/IServer";
import { serverStatus } from "../../enums/serverStatusesEnums/serverStatus";
import { serverMSG } from "../../enums/serverStatusesEnums/serverMSG";
import { validationDAL } from "../../middleware/validateDAL";


export const accessOrRefreshDAL = {
  loginDAL: async (loginData: ILogin): Promise<IServer> => {
    const { email, phoneNumber, password } = loginData;
    let checkUser: User;
    if (email) {
      checkUser = await AppDataSource.manager.findOneBy(User, { email });
    } else {
      checkUser = await AppDataSource.manager.findOneBy(User, { phoneNumber });
    }
    if (!checkUser) {
      return {status: serverStatus.NotFound, data: {}, msg: serverMSG.NotFound}
    } else {
      if (await bcrypt.compare(password, checkUser.password)) {
        return {status: serverStatus.Success, data: checkUser, msg: serverMSG.Success}
      } else {
        return {status: serverStatus.Unauthorized, data: {}, msg: serverMSG.Unauthorized}
      }
    }
  },

  registerDAL: async (registerData: IRegister): Promise<IServer> => {
    const { fullName, email, phoneNumber, password } = registerData;
    const hashedPasswordWithSalt: string = await bcrypt.hash(password, 10);
    const validateUser = AppDataSource.manager.create(User, {
        fullName: fullName,
        email: email,
        phoneNumber: phoneNumber,
        password: password,
        isStaff: false
      });
    try {
      const validationResult = await validationDAL(validateUser)
      const newUser = AppDataSource.manager.create(User, {
        fullName: fullName,
        email: email,
        phoneNumber: phoneNumber,
        password: hashedPasswordWithSalt,
        isStaff: false
      });

      if (!validationResult) { try { await newUser.save() } catch (error: any) {
          return {
            status: serverStatus.RequestFail,
            data: error.detail
          };
        } 
      }
      return {
        status: !validationResult? serverStatus.Success : serverStatus.RequestFail,
        data: !validationResult? newUser : validationResult,
        msg:  !validationResult? serverMSG.Success : serverMSG.RequestFail
      };
    } catch (error: any) {
      console.error(`Error in ${accessOrRefreshDAL.registerDAL.name} Message: ${error.message}`, {
        functionName: accessOrRefreshDAL.registerDAL.name,
      });
      return {
        status: serverStatus.RequestFail,
        data: error.message,
        msg: serverMSG.RequestFail
      };
    }
  },
};