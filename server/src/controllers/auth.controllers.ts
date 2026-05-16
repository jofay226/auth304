import { loginSchema, userSchema } from "../libs/zod/zod.ts"
import type {Request, Response} from 'express';
import { authServices } from "../services/auth.services.ts";
import { generateAccessToken, generateRefreshToken } from "../utils/generateTokens.ts";




export const registerController = async (req: Request, res:Response) => {
    const resultZod = userSchema.safeParse(req.body);
    if(!resultZod.success){
        res.status(400).json({message: "wrong input format"})
    }
    const finalResult = await authServices.register(resultZod.data!)
    res.json(finalResult)
}


export const loginController = async (req: Request, res:Response) => {
    const resultZod = loginSchema.safeParse(req.body);
    if(!resultZod.success){
        res.status(400).json({message: "wrong input format"})
        return
    }
    const finalResult = await authServices.login(resultZod.data!)
    
    if(finalResult.statusCode === 401) {
        return res.status(finalResult.statusCode).json(finalResult)
    }

    
    res.cookie("refreshToken", generateRefreshToken(finalResult.data?.id!),{
        httpOnly: true,
        secure: false,
        sameSite: "strict",
    })

    return res.json(generateAccessToken(finalResult.data?.id!))
}



export const verifyTokenController = async (req: Request, res:Response) => {
    return res.json({message: "access granted"})
}