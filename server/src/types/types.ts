export type UserData = {
    email: string
    userName: string 
    password: string
}


export type LoginData = Omit<UserData, "userName">