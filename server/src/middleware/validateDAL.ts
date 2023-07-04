import { validate } from "class-validator"
import { IServer } from "../interfaces/serverInterfaces/IServer"
import { serverStatus } from "../enums/serverStatusesEnums/serverStatus"


export const validationDAL = async (values: object): Promise<IServer> => {
  const validationErrors = await validate(values)
  if (validationErrors.length > 0) {
    return {
      status: serverStatus.RequestFail,
      data: validationErrors.map((error) => {return error.property})
    }
  }
}

