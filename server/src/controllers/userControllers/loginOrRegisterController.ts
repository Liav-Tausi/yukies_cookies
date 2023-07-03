import { Request, Response } from "express";
import { ILogin } from "../../interfaces/userInterfaces/ILogin";
import { IRegister } from "../../interfaces/userInterfaces/IRegister";
import { loginOrRegisterHandler } from "../../handlers/userHandlers/loginOrRegisterHandler";
import { serverStatus } from "../../enums/serverStatusesEnums/serverStatus";
import { serverErrorMSG, serverMSG } from "../../enums/serverStatusesEnums/serverMSG";

export const loginOrRegisterController = {
  loginController: async (req: Request, res: Response): Promise<void> => {
    try {
      const loginData: ILogin = req.body;
      loginOrRegisterHandler.loginHandler(loginData)
      res.status(serverStatus.Success).json({
        status: serverMSG.Success,
      })
    } catch (error: any) {
      console.error(`${serverErrorMSG.loginControllerERROR} ${error.stack}`)
      res.status(serverStatus.ServerFail).json({
        status: serverMSG.ServerFail,
        msg: error.message
      })
    }
  },
  registerController: async (req: Request, res: Response) => {
    try {
      const registerData: IRegister = req.body;
      loginOrRegisterHandler.registerHandler(registerData)
      res.status(serverStatus.Success).json({
      status: serverMSG.Success, 
      })
    } catch (error: any) {
      console.error(`${serverErrorMSG.registerControllerERROR} ${error.stack}`)
      res.status(serverStatus.ServerFail).json({
        status: serverMSG.ServerFail,
        msg: error.message
      })
    }
  },
};