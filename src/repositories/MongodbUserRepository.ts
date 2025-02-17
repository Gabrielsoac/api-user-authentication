// import { UserModel } from "../database/model/UserSchema";
import { TUserPersisted } from "../services/TUserPersisted";
import { IUserRepository } from "./IUserRepository";

export class MongoDbUserRepository implements IUserRepository {
    
    async findUserById(userID: string): Promise<TUserPersisted> {
        
        try {
            // const user = await UserModel.findById(userID);

            // if(!user){
            //     throw new Error('Erro ao buscar usuário');
            // }

            console.log('cheguei no mongodb user repository, id:' + userID);

            return {
                id: "Teste ID",
                username: "Teste username",
                email: "user.email"
            }
        } catch(err){
            throw new Error((err as Error).message);
        }
    }
}