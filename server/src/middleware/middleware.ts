import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { ACCESS_TOKEN_SECRET } from "../utils/generateTokens.ts";

export const checkToken = (req:Request, res:Response, next: NextFunction) => {
    const token = req.headers["authorization"]?.split(' ')[1];
    if(!token){
        return res.status(401).json({message: "no token"})
    }
    try{
        jwt.verify(token, ACCESS_TOKEN_SECRET)
        next()
    } catch(e){
        return res.status(401).json({message: "expired or invalid token"})
    }
}