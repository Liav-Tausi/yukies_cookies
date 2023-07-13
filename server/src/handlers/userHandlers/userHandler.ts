import { userDAL } from "../../DAL/userDAL/userDAL";
import { serverMSG } from "../../enums/serverStatusesEnums/serverMSG";
import { serverStatus } from "../../enums/serverStatusesEnums/serverStatus";
import { IServer } from "../../interfaces/serverInterfaces/IServer";
import { ISpecUser, isISpecUser } from "../../interfaces/userInterfaces/ISpecUser";
import { isIUser } from "../../interfaces/userInterfaces/IUser";
import { validationDAL } from "../../middleware/validateDAL";

export const userHandler = {
  getUserHandler: async (getUserData: ISpecUser): Promise<IServer> => {
    const validationResult = await validationDAL(getUserData)
    if (validationResult.status === serverStatus.Success) {
      const dalResult: IServer = await userDAL.getItemDAL(getUserData);
      if (dalResult.status === serverStatus.Success && isIUser(dalResult.data["user"])) {
          return dalResult
      } else {
          return {
          status: serverStatus.NotFound, 
          data: dalResult.data,
          msg: serverMSG.NotFound
        }
      }  
    } else {
       return validationResult
    }
  },
  listUserHandler: async (listUserData: ISpecUser): Promise<IServer> => {
    const validationResult = await validationDAL(listUserData);
    if (validationResult.status === serverStatus.Success) {
      const dalResult: IServer = await userDAL.listItemDAL(listUserData);
      if (dalResult.status === serverStatus.Success) {
        const users = dalResult.data["users"];
        if (Array.isArray(users)) {
          return {
            status: serverStatus.Success,
            data: { users: users },
            msg: serverMSG.Success
          };
        } else {
          return {
            status: serverStatus.NotFound,
            data: dalResult.data,
            msg: serverMSG.NotFound
          };
        }
      } else {
        return {
          status: serverStatus.NotFound,
          data: dalResult.data,
          msg: serverMSG.NotFound
        };
      }
    } else {
      return validationResult
    }
  },
  patchUserHandler: async (patchUserData: ISpecUser, userId: number): Promise<IServer> => {
    const validationResult = await validationDAL(patchUserData)
    if (validationResult.status === serverStatus.Success) {
      const dalResult: IServer = await userDAL.patchItemDAL(patchUserData, userId);
      if (dalResult.status === serverStatus.Updated) {
          return dalResult
      } else {
          return {
          status: serverStatus.NotFound, 
          data: dalResult.data,
          msg: serverMSG.NotFound
        }
      }  
    } else {
       return validationResult
    }
  },
  deleteUserHandler: async (deleteUserData: ISpecUser): Promise<IServer> => {
    const validationResult = await validationDAL(deleteUserData)
    if (validationResult.status === serverStatus.Success ) {
      const dalResult: IServer = await userDAL.deleteItemDAL(deleteUserData);
      if (dalResult.status === serverStatus.Deleted) {
          return dalResult
      } else {
          return {
          status: serverStatus.NotFound, 
          data: dalResult.data,
          msg: serverMSG.NotFound
        }
      }  
    } else {
      return validationResult
    }
  },
}