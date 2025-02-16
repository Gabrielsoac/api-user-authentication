import { TUserProps } from "../database/model/TUserProps";
import { IUserRepository } from "./IUserRepository";

export class MongoDbUserRepository implements IUserRepository {
    
    findUserById(userID: string): Promise<TUserProps> {
        throw new Error(userID);
    }
}