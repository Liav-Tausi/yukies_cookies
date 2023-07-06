import { AppDataSource } from "../../AppDataSource";
import { Cake } from "../../entities/Cake";
import { serverMSG } from "../../enums/serverStatusesEnums/serverMSG";
import { serverStatus } from "../../enums/serverStatusesEnums/serverStatus";
import { ICake } from "../../interfaces/cakeInterfaces/ICake";
import { IServer } from "../../interfaces/serverInterfaces/IServer";

export const catalogDAL = {
  addItemDAL: async (addItemData: ICake): Promise<IServer> => {
    const { name, shortDescription, longDescription, price, imageUrl } = addItemData;
        try {
      const newCake = AppDataSource.manager.create(Cake, {
        name,
        shortDescription,
        longDescription,
        price,
        imageUrl
      });
      try { 
        await newCake.save() 
        return {
          status: serverStatus.Created,
          data: newCake,
          msg:  serverMSG.Created 
        };
      } catch (error: any) {
        return {
          status: serverStatus.RequestFail,
          data: error.detail,
          msg: serverMSG.RequestFail
        };
      }
    
  } catch (error: any) {
      console.error(error.message, {
        functionName: catalogDAL.addItemDAL.name,
      });
      return {
        status: serverStatus.RequestFail,
        data: error.message,
        msg: serverMSG.RequestFail
      };
    }
  },
  getItemDAL: async (getItemData): Promise<void> => {

  },
  patchItemDAL: async (patchItemData): Promise<void> => {

  },
  deleteItemDAL: async (deleteItemData): Promise<void> => {

  },
}