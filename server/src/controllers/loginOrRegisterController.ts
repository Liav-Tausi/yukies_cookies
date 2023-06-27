import { Request, Response } from "express";
import { ILogin } from "../interfaces/userInterfaces/ILogin";
import { IRegister } from "../interfaces/userInterfaces/IRegister";

export const loginOrRegisterController = {
  login: async (req: Request, res: Response): Promise<void> => {
    const loginData: ILogin = req.body;
    res.send('login')
    console.log('login')
  },
  register: async (req: Request, res: Response) => {
    const registerData: IRegister = req.body;
     console.log('register')
     res.send('register')
  },
};