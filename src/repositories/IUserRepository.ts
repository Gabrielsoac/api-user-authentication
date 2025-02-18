import { TCreateUserRequestDto } from "../controllers/dtos/TCreateUserRequestDto";
import { TGetUserRequestDto } from "../controllers/dtos/TGetUserRequestDto";
import { TUserPersisted } from "../services/TUserPersisted";

export interface IUserRepository {
    findUserById(userID: string): Promise<TUserPersisted>;
    findUsers(): Promise<TUserPersisted[]>;
    createUser(userData: TCreateUserRequestDto): Promise<TUserPersisted>;
    updateUserById(userId: TGetUserRequestDto, userData: TCreateUserRequestDto): Promise<TUserPersisted>
    deleteUserById(userId: TGetUserRequestDto): Promise<void>
}