import jwt from 'jsonwebtoken';
import { generateCryptoKey } from './generateCryptoKey.ts';


const ACCESS_TOKEN_SECRET = generateCryptoKey() ;
const REFRESH_TOKEN_SECRET =  generateCryptoKey();



export const generateAccessToken = (id:string) => {
    return  jwt.sign(id, ACCESS_TOKEN_SECRET, {expiresIn: '1m'} )
}

export const generateRefreshToken = (id:string) => {
    return  jwt.sign(id, REFRESH_TOKEN_SECRET, {expiresIn: '3m'} )
}