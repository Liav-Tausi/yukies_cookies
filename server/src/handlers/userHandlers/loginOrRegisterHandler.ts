import { loginOrRegisterDAL } from "../../DAL/userDAL/loginOrRegisterDAL";
import { ILogin } from "../../interfaces/userInterfaces/ILogin";
import { IRegister } from "../../interfaces/userInterfaces/IRegister";

export const loginOrRegisterHandler = {
  loginHandler: async (loginData: ILogin): Promise<void> => {
    loginOrRegisterDAL.loginDAL(loginData)
  },
  registerHandler: async (registerData: IRegister) => {
    loginOrRegisterDAL.registerDAL(registerData)

  },
};