import { TCreateUserRequestDto } from "../controllers/dtos/TRegisterUserRequestDto";
import { TGetUserRequestDto } from "../controllers/dtos/TGetUserRequestDto";
import { TUserPersisted } from "../services/TUserPersisted";

export interface IUserRepository {
    findUserById(userID: string): Promise<TUserPersisted | null>;
    findUserByUsername(username: string): Promise<TUserPersisted | null>;
    findUserByEmail(email: string): Promise<TUserPersisted | null>;
    findUsers(): Promise<TUserPersisted[]>;
    createUser(userData: TCreateUserRequestDto): Promise<TUserPersisted>;
    updateUserById(userId: TGetUserRequestDto, userData: TCreateUserRequestDto): Promise<TUserPersisted>
    deleteUserById(userId: TGetUserRequestDto): Promise<void>
}