import { TUserRole } from "../database/model/TUserProps"

export type TUserPersisted = {
    id: string,
    username: string,
    email: string,
    password: string
    role: TUserRole
}