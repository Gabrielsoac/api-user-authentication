import { TUserPersisted } from "../services/TUserPersisted";

export interface IUserRepository {
    findUserById(userID: string): Promise<TUserPersisted>;
}