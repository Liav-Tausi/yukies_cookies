import { DataSource } from "typeorm";
import { ILogin } from "../../interfaces/userInterfaces/ILogin";
import { IRegister } from "../../interfaces/userInterfaces/IRegister";
import { createHash } from 'crypto';
import bcrypt from 'bcrypt';
import { User } from "../../entities/User";
import IUser from "../../interfaces/userInterfaces/IUser";
import { AppDataSource } from "../../AppDataSource";
import { serverMSG } from "../../enums/serverStatusesEnums/serverMSG";

export const accessOrRefreshDAL = {
  loginDAL: async (loginData: ILogin): Promise<void> => {
    // Implement the login logic
  },
  registerDAL: async (registerData: IRegister): Promise<IUser | Error> => {
    const { fullName, email, phoneNumber, password } = registerData;
    const hashedPassword = createHash('sha256').update(password).digest('hex');
    const hashedPasswordWithSalt = await bcrypt.hash(hashedPassword, 10);
    try {
      const insertedUser = AppDataSource.manager.create(User, {
        fullName: fullName,
        email: email,
        phoneNumber: phoneNumber,
        password: hashedPasswordWithSalt,
        isStaff: false
      });
      await insertedUser.save();
      return insertedUser;
    } catch (error: any) {
      console.error(`Error in ${accessOrRefreshDAL.registerDAL.name} Message: ${error.message}`, {
        functionName: accessOrRefreshDAL.registerDAL.name,
      });
      return error.message;
    }
  },
};