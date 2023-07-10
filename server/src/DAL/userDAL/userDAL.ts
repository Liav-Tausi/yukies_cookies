import { DeleteResult, UpdateResult } from "typeorm";
import { AppDataSource } from "../../AppDataSource";
import { serverMSG } from "../../enums/serverStatusesEnums/serverMSG";
import { serverStatus } from "../../enums/serverStatusesEnums/serverStatus";
import { IServer } from "../../interfaces/serverInterfaces/IServer";
import { User } from "../../entities/User";
import ISpecUser from "../../interfaces/userInterfaces/ISpecUser";
import { isIUser } from "../../interfaces/userInterfaces/IUser";

export const userDAL = {
  getItemDAL: async (getUserData: ISpecUser): Promise<IServer> => {
    try {
      const user: User = await AppDataSource.manager.findOneBy(User, getUserData);
      if (user) {
        const { password, ...userWithoutPassword } = user;
        return {
          status: serverStatus.Success,
          data: {user: userWithoutPassword},
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
        functionName: userDAL.getItemDAL.name,
      });
      return {
        status: serverStatus.RequestFail,
        data: error.message,
        msg: serverMSG.RequestFail
      };
    }
  },
  listItemDAL: async (getUserData: ISpecUser): Promise<IServer> => {
    try {
      const users: User[] = await AppDataSource.manager.findBy(User, getUserData);
      if (users.some(user => isIUser(user))) {
        const usersWithoutPassword = users.map(({ password, ...user }) => user);
        return {
          status: serverStatus.Success,
          data: { users: usersWithoutPassword },
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
        functionName: userDAL.listItemDAL.name,
      });
      return {
        status: serverStatus.RequestFail,
        data: error.message,
        msg: serverMSG.RequestFail
      };
    }
  },
  patchItemDAL: async (patchUserData: ISpecUser, userId: number): Promise<IServer> => {
    try {
      const user: UpdateResult = await AppDataSource.manager.update(User, userId, patchUserData);
      if (user) {
        return {
          status: serverStatus.Updated,
          data: {user: user},
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
        functionName: userDAL.listItemDAL.name,
      });
      return {
        status: serverStatus.RequestFail,
        data: error.message,
        msg: serverMSG.RequestFail
      };
    }
  },
  deleteItemDAL: async (deleteUserData: ISpecUser): Promise<IServer> => {
    try {
      const user: DeleteResult = await AppDataSource.manager.delete(User, deleteUserData);
      if (user) {
        return {
          status: serverStatus.Deleted,
          data: {user: user},
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
        functionName: userDAL.deleteItemDAL.name,
      });
      return {
        status: serverStatus.RequestFail,
        data: error.message,
        msg: serverMSG.RequestFail
      };
    }
  },
}