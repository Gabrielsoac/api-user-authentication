import { TRegisterUserRequestDto } from "../controllers/dtos/TRegisterUserRequestDto";
import { TUserPersisted } from "./TUserPersisted";

export interface IUserService {

    getUser(id: string): Promise<TUserPersisted>;
    getUsers(): Promise<TUserPersisted[]>;
    updateUser(user: TUserPersisted, userData: TRegisterUserRequestDto): Promise<TUserPersisted>
    deleteUser(userId: string): Promise<void>
}
