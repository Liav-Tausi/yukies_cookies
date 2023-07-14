import { DeleteResult, UpdateResult } from "typeorm";
import { AppDataSource } from "../../AppDataSource";
import { Cake } from "../../entities/Cake";
import { serverMSG } from "../../enums/serverStatusesEnums/serverMSG";
import { serverStatus } from "../../enums/serverStatusesEnums/serverStatus";
import { ICake, isICake } from "../../interfaces/cakeInterfaces/ICake";
import { ISpecCake } from "../../interfaces/cakeInterfaces/ISpecCake";
import { IServer } from "../../interfaces/serverInterfaces/IServer";

export const catalogDAL = {
  addItemDAL: async (addItemData: ICake): Promise<IServer> => {
    const { name, shortDescription, longDescription, price, imageUrl } = addItemData;
      try {
        const newCake: Cake = AppDataSource.manager.create(Cake, {
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
  getItemDAL: async (getItemData: ISpecCake): Promise<IServer> => {
    try {
      const cake: Cake = await AppDataSource.manager.findOneBy(Cake, getItemData);
      if (cake) {
        return {
          status: serverStatus.Success,
          data: {cake: cake},
          msg: serverMSG.Success
        }
      } else {
        return {
          status: serverStatus.NotFound,
          data: {},
          msg: serverMSG.NotFound
        }
      }
    } catch (error: any) {
        console.error(error.message, {
        functionName: catalogDAL.getItemDAL.name,
      });
      return {
        status: serverStatus.RequestFail,
        data: error.message,
        msg: serverMSG.RequestFail
      };
    }
  },
  listItemDAL: async (getItemData: ISpecCake): Promise<IServer> => {
    try {
      const cakes: Cake[] = await AppDataSource.manager.findBy(Cake, getItemData);
      if (cakes.some(cake => isICake(cake))) {
        return {
          status: serverStatus.Success,
          data: { cakes: cakes },
          msg: serverMSG.Success
        };
      } else {
        return {
          status: serverStatus.NotFound,
          data: {},
          msg: serverMSG.NotFound
        };
      }
    } catch (error: any) {
      console.error(error.message, {
        functionName: catalogDAL.listItemDAL.name,
      });
      return {
        status: serverStatus.RequestFail,
        data: error.message,
        msg: serverMSG.RequestFail
      };
    }
  },
  patchItemDAL: async (patchItemData: ISpecCake, cakeId: number): Promise<IServer> => {
    try {
      const cake: UpdateResult = await AppDataSource.manager.update(Cake, cakeId, patchItemData);
      if (cake) {
        return {
          status: serverStatus.Updated,
          data: {cake: cake},
          msg: serverMSG.Updated
        }
      } else {
        return {
          status: serverStatus.NotFound,
          data: {},
          msg: serverMSG.NotFound
        }
      }
    } catch (error: any) {
        console.error(error.message, {
        functionName: catalogDAL.listItemDAL.name,
      });
      return {
        status: serverStatus.RequestFail,
        data: error.message,
        msg: serverMSG.RequestFail
      };
    }
  },
  deleteItemDAL: async (deleteItemData: ISpecCake): Promise<IServer> => {
    try {
      const cake: DeleteResult = await AppDataSource.manager.delete(Cake, deleteItemData);
      if (cake) {
        return {
          status: serverStatus.Deleted,
          data: {cake: cake},
          msg: serverMSG.Deleted
        }
      } else {
        return {
          status: serverStatus.NotFound,
          data: {},
          msg: serverMSG.NotFound
        }
      }
    } catch (error: any) {
        console.error(error.message, {
        functionName: catalogDAL.deleteItemDAL.name,
      });
      return {
        status: serverStatus.RequestFail,
        data: error.message,
        msg: serverMSG.RequestFail
      };
    }
  },
}

