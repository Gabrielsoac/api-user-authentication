import { TRegisterUserRequestDto } from "../controllers/dtos/TRegisterUserRequestDto";
import { TGetUserRequestDto } from "../controllers/dtos/TGetUserRequestDto";
import { TUserPersisted } from "./TUserPersisted";

export interface IUserService {

    getUser(id: string): Promise<TUserPersisted>;
    getUsers(): Promise<TUserPersisted[]>;
    updateUser(userId: TGetUserRequestDto, userData: TRegisterUserRequestDto): Promise<TUserPersisted>
    deleteUser(userId: string): Promise<void>
}
