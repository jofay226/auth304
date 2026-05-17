import { loginSchema, userSchema } from "../libs/zod/zod.ts"
import type {Request, Response} from 'express';
import { authServices } from "../services/auth.services.ts";
import { generateAccessToken, generateRefreshToken, REFRESH_TOKEN_SECRET } from "../utils/generateTokens.ts";
import prisma from "../libs/prisma/prisma.ts";
import jwt, { JwtPayload } from 'jsonwebtoken';




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

    const refreshToken = generateRefreshToken(finalResult.data?.id!);

    await prisma.user.update({
        where: {id: finalResult.data?.id },
        data: {
            refreshToken: refreshToken
        }
    })

    
    res.cookie("refreshToken",refreshToken ,{
        httpOnly: true,
        secure: false,
        sameSite: "strict",
    })

    return res.json(generateAccessToken(finalResult.data?.id!))
}



export const verifyTokenController = async (req: Request, res:Response) => {
    return res.json({message: "access granted"})
}



export const refreshController = async (req: Request, res:Response) => {
    const refreshToken = req.cookies["refreshToken"]
    if(!refreshToken) {
        return res.status(401).json({message: "no token on cookie"})
    }
    try{
        const  user   =  jwt.verify(refreshToken, REFRESH_TOKEN_SECRET) 
  

        const newAccessToken =    generateAccessToken(user.id)
        const newRefreshToken =    generateRefreshToken(user.id)

        
    } catch(e){
        return res.status(401).json({message: "refresh expired or invalid"})
    }
    


}