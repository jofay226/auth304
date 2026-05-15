import prisma from "../libs/prisma/prisma.ts";
import { LoginData, UserData } from "../types/types.ts";
import bcrypt from 'bcryptjs';



export const authServices = {
    register:  async (userData: UserData) => {
        const existingUser = await prisma.user.findUnique({
            where: {email: userData.email }
        })
        if(existingUser){
            return {statuscode: 409, message: "user already exists", data: null}
        }
        const hashedPassword= await bcrypt.hash(userData.password, 10);
        const newUser = await prisma.user.create({
            data: {
                userName: userData.userName,
                email: userData.email,
                password: hashedPassword
            }
        })
        return {statusCode: 201, message: "user successfully registered", data: newUser}
    },

    login: async (loginData: LoginData) => {
        const user = await prisma.user.findUnique({
            where: {email: loginData.email}
        })
        if(!user) {
            return {statusCode: 401 , message: "wrong cred", data: null}
        }

        const passwordCheck = await  bcrypt.compare(loginData.password, user.password);

        if(!passwordCheck) {
            return {statusCode: 401 , message: "wrong cred", data: null}
        }

        return  {statusCode: 200 , message: "success", data: user}

    }

}