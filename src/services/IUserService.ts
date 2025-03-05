import { TCreateUserRequestDto } from "../controllers/dtos/TCreateUserRequestDto";
import { TGetUserRequestDto } from "../controllers/dtos/TGetUserRequestDto";
import { TUserPersisted } from "./TUserPersisted";

export interface IUserService {

    getUser(id: string): Promise<TUserPersisted>;
    getUsers(): Promise<TUserPersisted[]>;
    updateUser(userId: TGetUserRequestDto, userData: TCreateUserRequestDto): Promise<TUserPersisted>
    deleteUser(userId: TGetUserRequestDto): Promise<void>
}
