import { NextFunction, Request, Response } from "express";

export const checkToken = (req:Request, res:Response, next: NextFunction) => {
    const token = req.headers["authorization"]?.split(' ')[1]
    console.log(token);



    next()
}