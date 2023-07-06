import { AppDataSource } from "../../AppDataSource";
import { catalogDAL } from "../../DAL/catalogDAL/catalogDAL";
import { Cake } from "../../entities/Cake";
import { serverMSG } from "../../enums/serverStatusesEnums/serverMSG";
import { serverStatus } from "../../enums/serverStatusesEnums/serverStatus";
import { ICake, isICake } from "../../interfaces/cakeInterfaces/ICake";
import { IServer } from "../../interfaces/serverInterfaces/IServer";
import { validationDAL } from "../../middleware/validateDAL";

export const catalogHandler = {
  addItemHandler: async (addItemData: ICake): Promise<IServer> => {
    const validateUser = AppDataSource.manager.create(Cake, addItemData);
    const validationResult = await validationDAL(validateUser)

    if (validationResult.status === serverStatus.Success ) {
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
    }
  },
  // getItemHandler: async (getItemData): Promise<void> => {
  //   const dalResult: IServer = await catalogDAL.getItemDAL();
  // },
  // patchItemHandler: async (patchItemData): Promise<void> => {
  //   const dalResult: IServer = await catalogDAL.patchItemDAL();
  // },
  // deleteItemHandler: async (deleteItemData): Promise<void> => {
  //   const dalResult: IServer = await catalogDAL.deleteItemDAL();
  // },
}