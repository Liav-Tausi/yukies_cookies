import { AppDataSource } from "../../AppDataSource";
import { catalogDAL } from "../../DAL/catalogDAL/catalogDAL";
import { Cake } from "../../entities/Cake";
import { serverMSG } from "../../enums/serverStatusesEnums/serverMSG";
import { serverStatus } from "../../enums/serverStatusesEnums/serverStatus";
import { ICake, isICake } from "../../interfaces/cakeInterfaces/ICake";
import { ISpacCake, isISpacCake } from "../../interfaces/cakeInterfaces/ISpecCake";
import { IServer } from "../../interfaces/serverInterfaces/IServer";
import { validationDAL } from "../../middleware/validateDAL";

export const catalogHandler = {
  addItemHandler: async (addItemData: ICake): Promise<IServer> => {
    const validateUser: ICake = AppDataSource.manager.create(Cake, addItemData);
    const validationResult = await validationDAL(validateUser)
    if (validationResult.status === serverStatus.Success) {
        const dalResult: IServer = await catalogDAL.addItemDAL(addItemData);
        if (dalResult.status === serverStatus.Created && isICake(dalResult.data)) {
          return {
            status: serverStatus.Created, 
            data: dalResult.data,
            msg: dalResult.msg
          }
      } else {
          return {
          status: serverStatus.RequestFail, 
          data: dalResult.data,
          msg: serverMSG.RequestFail
        }
      }  
    } else {
       return validationResult
    }
  },
  getItemHandler: async (getItemData: ISpacCake): Promise<IServer> => {
    const validationResult = await validationDAL(getItemData)
    if (validationResult.status === serverStatus.Success ) {
      const dalResult: IServer = await catalogDAL.getItemDAL(getItemData);
      if (dalResult.status === serverStatus.Success && isISpacCake(dalResult.data["cake"])) {
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
  listItemHandler: async (listItemData: ISpacCake): Promise<IServer> => {
  const validationResult = await validationDAL(listItemData);
  if (validationResult.status === serverStatus.Success) {
    const dalResult: IServer = await catalogDAL.listItemDAL(listItemData);
    if (dalResult.status === serverStatus.Success) {
      const cakes = dalResult.data["cakes"];
      if (Array.isArray(cakes)) {
        return {
          status: serverStatus.Success,
          data: { cakes: cakes },
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
  patchItemHandler: async (patchItemData: ISpacCake, cakeId: number): Promise<IServer> => {
    const validationResult = await validationDAL(patchItemData)
    if (validationResult.status === serverStatus.Success) {
      const dalResult: IServer = await catalogDAL.patchItemDAL(patchItemData, cakeId);
      if (dalResult.status === serverStatus.Updated && isISpacCake(dalResult.data["cake"])) {
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
  deleteItemHandler: async (deleteItemData: ISpacCake): Promise<IServer> => {
    const validationResult = await validationDAL(deleteItemData)
    if (validationResult.status === serverStatus.Success ) {
      const dalResult: IServer = await catalogDAL.deleteItemDAL(deleteItemData);
      if (dalResult.status === serverStatus.Deleted && isISpacCake(dalResult.data["cake"])) {
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