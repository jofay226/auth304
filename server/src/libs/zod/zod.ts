import z from "zod";


export const userSchema = z.object({
    userName: z.string().min(2),
    email:  z.email(),
    password: z.string().min(3)
})