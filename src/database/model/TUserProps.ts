export type TUserProps = {
    username: string,
    email: string,
    password: string
    role: TUserRole
}

export type TUserRole = 'ADMIN' | 'USER';