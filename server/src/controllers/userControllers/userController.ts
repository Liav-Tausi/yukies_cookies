import { Request, Response } from "express";
import { IServer } from "../../interfaces/serverInterfaces/IServer";
import { serverStatus } from "../../enums/serverStatusesEnums/serverStatus";
import { zodErrorHandling } from "../../middleware/zodErrorHandling";
import { userOptionalValidation } from "../../middleware/userValidations/userOptionalValidation";
import ISpecUser from "../../interfaces/userInterfaces/ISpecUser";
import { userHandler } from "../../handlers/userHandlers/userHandler";

export const userController = {
  getUserController: async (req: Request, res: Response): Promise<void> => {
    try {
      const listOrGet = req.query.first
      const { fullName, phoneNumber, email } = req.query
      const id = req.query.user !== undefined ? Number(req.query.user) : undefined;
      const userData: any = userOptionalValidation.parse({id, fullName, phoneNumber, email});
      if (listOrGet) {
        const handlerResult: IServer = await userHandler.getUserHandler(userData);
        res.status(
          handlerResult.status === serverStatus.Success
          ? serverStatus.Success 
          : handlerResult.status === serverStatus.NotFound
          ? serverStatus.NotFound 
          : serverStatus.RequestFail
        ).json(handlerResult);
      } else {
        const handlerResult: IServer = await userHandler.listUserHandler(userData);
        res.status(
          handlerResult.status === serverStatus.Success
          ? serverStatus.Success 
          : handlerResult.status === serverStatus.NotFound
          ? serverStatus.NotFound 
          : serverStatus.RequestFail
        ).json(handlerResult);
      }
    } catch (error: any) {
      console.error(error.stack);
      zodErrorHandling(error, res)
    }
  },
  patchUserController: async (req: Request, res: Response): Promise<void> => {
    try {
      const initialUserData: ISpecUser = req.body
      const userId: number = Number(req.query.user)
      const userData: any = userOptionalValidation.parse(initialUserData);
      const handlerResult = await userHandler.patchUserHandler(userData, userId);
      const serverResultStatus: number = handlerResult.status

      res.status(
        serverResultStatus === serverStatus.Updated
        ? serverStatus.Updated 
        : serverStatus.RequestFail
      ).json(handlerResult);

    } catch (error: any) {
      console.error(error.stack);
      zodErrorHandling(error, res)
    }
  },
  deleteUserController: async (req: Request, res: Response): Promise<void> => {
    try {
      const id = req.query.user !== undefined ? Number(req.query.user) : undefined;
      const userData: any = userOptionalValidation.parse({id});
      const handlerResult = await userHandler.deleteUserHandler(userData);
      const serverResultStatus: number = handlerResult.status

      res.status(
        serverResultStatus === serverStatus.Deleted
        ? serverStatus.Deleted 
        : serverStatus.RequestFail
      ).json(handlerResult);

    } catch (error: any) {
      console.error(error.stack);
      zodErrorHandling(error, res)
    }
  },
}