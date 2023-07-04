import { Request, Response } from "express";
import { ILogin } from "../../interfaces/userInterfaces/ILogin";
import { IRegister } from "../../interfaces/userInterfaces/IRegister";
import { serverStatus } from "../../enums/serverStatusesEnums/serverStatus";
import { serverErrorMSG, serverMSG } from "../../enums/serverStatusesEnums/serverMSG";
import { accessOrRefreshHandler } from "../../handlers/userHandlers/accessOrRefreshHandler";
import { IServer } from "../../interfaces/serverInterfaces/IServer";

export const accessOrRefreshController = {
  loginController: async (req: Request, res: Response): Promise<void> => {
    try {
     const loginData: ILogin = req.body;
      const handlerResult: IServer = await accessOrRefreshHandler.loginHandler(loginData);
      const serverResultData = handlerResult.data
      const serverResultStatus = handlerResult.status

      res.status(serverResultStatus === serverStatus.Success ? serverStatus.Success :
         serverResultStatus === serverStatus.NotFound? serverStatus.NotFound: serverStatus.Unauthorized
        ).json({
          status: serverResultStatus ? serverResultStatus : serverStatus.Unauthorized,
          data: serverResultData["refreshToken"] && serverResultData["accessToken"] ?
          serverResultData : serverResultData["data"] ?? serverResultData,
          msg: handlerResult.msg
        });
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
      const handlerResult: IServer = await accessOrRefreshHandler.registerHandler(registerData);
      const serverResultData = handlerResult.data
      const serverResultStatus = handlerResult.status

      res.status(serverResultStatus === serverStatus.Success ? serverStatus.Created : serverStatus.RequestFail).json({
        status: serverResultStatus ? serverResultStatus : serverStatus.RequestFail,
        data: serverResultData["refreshToken"] && serverResultData["accessToken"] ?
         serverResultData : serverResultData["data"] ? serverErrorMSG.InvalidFields + serverResultData["data"] : serverResultData,
        msg: handlerResult.msg
      });

    } catch (error: any) {
      console.error(`${serverErrorMSG.registerControllerERROR} ${error.stack}`);
      res.status(serverStatus.ServerFail).json({
        status: serverMSG.ServerFail,
        msg: error.message,
      });
    }
  },
};