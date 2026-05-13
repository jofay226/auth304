import { userSchema } from "../libs/zod/zod.ts"
import type {Request, Response} from 'express';
import { authServices } from "../services/auth.services.ts";



export const registerController = async (req: Request, res:Response) => {
    const resultZod = userSchema.safeParse(req.body);
    if(!resultZod.success){
        res.status(400).json({message: "wrong input format"})
    }
    const finalResult = await authServices.register(resultZod.data!)
    res.json(finalResult)
}


export const loginController = async (req: Request, res:Response) => {


    

}