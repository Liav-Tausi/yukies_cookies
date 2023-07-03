
import { ILogin } from "../../interfaces/userInterfaces/ILogin";
import { IRegister } from "../../interfaces/userInterfaces/IRegister";
import { createHash } from 'crypto';
import bcrypt from 'bcrypt';
import { AppDataSource } from "../../AppDataSource";
import { User } from "../../entities/User";


export const loginOrRegisterDAL = {
  loginDAL: async (loginData: ILogin) => {

  },
  registerDAL: async (registerData: IRegister) => {
    const { fullName, email, phoneNumber, password } = registerData;
    const hashedPassword = createHash('sha256').update(password).digest('hex');
    const hashedPasswordWithSalt = await bcrypt.hash(hashedPassword, 10);

   const user =  await AppDataSource.createQueryBuilder().insert().into(User).values({
      fullName: fullName,
      email: email,
      phoneNumber: phoneNumber,
      password: hashedPasswordWithSalt,
      isStaff: false
    }).execute();
  },
};