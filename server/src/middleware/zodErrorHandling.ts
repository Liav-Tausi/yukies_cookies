import { ZodError } from "zod";
import { serverStatus } from "../enums/serverStatusesEnums/serverStatus";
import { serverMSG } from "../enums/serverStatusesEnums/serverMSG";
import { Response } from "express";

export const zodErrorHandling = (error: any, res: Response) => {
    if (error instanceof ZodError) {
        let validationErrors: Array<string> = []
        error.errors.forEach((validationError) => validationErrors.push(validationError.message));
        res.status(serverStatus.RequestFail).json({
        status: serverMSG.RequestFail,
        msg: validationErrors,
        });
      } else {
      res.status(serverStatus.ServerFail).json({
        status: serverMSG.ServerFail,
        msg: error.message,
      });
     }  
}