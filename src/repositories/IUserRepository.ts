import { TUserProps } from "../database/model/TUserProps";

export interface IUserRepository {

    findUserById(userID: string): Promise<TUserProps>;

}