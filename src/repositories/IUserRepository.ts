import { TRegisterUserRequestDto } from "../controllers/dtos/TRegisterUserRequestDto";
import { TGetUserRequestDto } from "../controllers/dtos/TGetUserRequestDto";
import { TUserPersisted } from "../services/TUserPersisted";

export interface IUserRepository {
    findUserById(userID: string): Promise<TUserPersisted | null>;
    findUserByUsername(username: string): Promise<TUserPersisted | null>;
    findUserByEmail(email: string): Promise<TUserPersisted | null>;
    findUsers(): Promise<TUserPersisted[]>;
    createUser(userData: TRegisterUserRequestDto): Promise<TUserPersisted>;
    updateUserById(userId: TGetUserRequestDto, userData: TRegisterUserRequestDto): Promise<TUserPersisted>
    deleteUserById(userId: string): Promise<void>
}