import { Request, Response } from "express";
import { ILogin } from "../../interfaces/userInterfaces/ILogin";
import { IRegister } from "../../interfaces/userInterfaces/IRegister";
import { serverStatus } from "../../enums/serverStatusesEnums/serverStatus";
import { serverErrorMSG, serverMSG } from "../../enums/serverStatusesEnums/serverMSG";
import { loginOrRegisterHandler } from "../../handlers/userHandlers/loginOrRegisterHandler";
import { IServer } from "../../interfaces/serverInterfaces/IServer";
import { loginValidation, registerValidation } from "../../middleware/userValidations/loginOrRgisterDataValidation";
import { zodErrorHandling } from "../../middleware/zodErrorHandling";

export const loginOrRegisterController = {
  loginController: async (req: Request, res: Response): Promise<void> => {
  try {
    const initialLoginData: ILogin = req.body
    const loginData: any = loginValidation.parse(initialLoginData);
    const handlerResult: IServer = await loginOrRegisterHandler.loginHandler(loginData);
    const serverResultStatus: number = handlerResult.status;

    res.status(
      serverResultStatus === serverStatus.Success
        ? serverStatus.Success
        : serverResultStatus === serverStatus.NotFound
        ? serverStatus.NotFound
        : serverStatus.Unauthorized
    ).json(handlerResult);

  } catch (error: any) {
    console.error(error.stack);
    zodErrorHandling(error, res)
  }
},
 registerController: async (req: Request, res: Response): Promise<void> => {
    try {
      const initialRegisterData: IRegister = req.body
      const registerData: any = registerValidation.parse(initialRegisterData);
      const handlerResult: IServer = await loginOrRegisterHandler.registerHandler(registerData);
      const serverResultStatus: number = handlerResult.status

      res.status(
        serverResultStatus === serverStatus.Created
        ? serverStatus.Created 
        : serverStatus.RequestFail
      ).json(handlerResult);
      
    } catch (error: any) {
      console.error(error.stack);
      zodErrorHandling(error, res)
    }
  },
};