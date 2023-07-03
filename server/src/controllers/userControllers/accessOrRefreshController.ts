import { Request, Response } from "express";
import { ILogin } from "../../interfaces/userInterfaces/ILogin";
import { IRegister } from "../../interfaces/userInterfaces/IRegister";
import { serverStatus } from "../../enums/serverStatusesEnums/serverStatus";
import { serverErrorMSG, serverMSG } from "../../enums/serverStatusesEnums/serverMSG";
import { accessOrRefreshHandler } from "../../handlers/userHandlers/accessOrRefreshHandler";

export const accessOrRefreshController = {
  loginController: async (req: Request, res: Response): Promise<void> => {
    try {
      const loginData: ILogin = req.body;
      accessOrRefreshHandler.loginHandler(loginData)
      res.status(serverStatus.Success).json({
        status: serverMSG.Success,
        msg: 'login'
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
      const handlerResult = accessOrRefreshHandler.registerHandler(registerData)
      res.status(handlerResult? serverStatus.Success: serverStatus.NotFound).json({
      status: handlerResult? serverStatus.Success: serverStatus.NotFound, 
      msg: handlerResult? serverStatus.Success: serverStatus.NotFound
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