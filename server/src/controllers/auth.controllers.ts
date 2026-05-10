import { userSchema } from "../libs/zod/zod.ts"
import type {Request, Response} from 'express';



export const registerController = async (req: Request, res:Response) => {
    const result = userSchema.safeParse(req.body);
    console.log(result);
}