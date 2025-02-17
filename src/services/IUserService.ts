import { TUserPersisted } from "./TUserPersisted";

export interface IUserService {

    getUser(id: string): Promise<TUserPersisted>;
}
