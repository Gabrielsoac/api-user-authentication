import { TUserRole } from "../../database/model/TUserProps"

export type TRegisterUserRequestDto = {
    username: string,
    email: string,
    password: string,
    role: TUserRole
}