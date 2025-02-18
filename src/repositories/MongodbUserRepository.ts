// import { UserModel } from "../database/model/UserSchema";
import { TCreateUserRequestDto } from "../controllers/dtos/TCreateUserRequestDto";
import { TGetUserRequestDto } from "../controllers/dtos/TGetUserRequestDto";
import { UserModel } from "../database/model/UserSchema";
import { TUserPersisted } from "../services/TUserPersisted";
import { IUserRepository } from "./IUserRepository";

export class MongoDbUserRepository implements IUserRepository {
    
    async findUsers(): Promise<TUserPersisted[]> {
        try {
            const users = await UserModel.find();

            const usersPersisted = users.map(
                (x) => {
                    return {
                        id: x._id.toString(),
                        username: x.username,
                        email: x.email,
                    }
                }
            );

            return usersPersisted;
        }
        catch(err){
            throw new Error((err as Error).message);
        }
    }
    
    async createUser(userData: TCreateUserRequestDto): Promise<TUserPersisted> {
        try {
            const user = await UserModel.create(
                {...userData}
            );

            return {
                id: user._id.toString(),
                username: user.username,
                email: user.email
            }
        }
        catch(err){
            throw new Error((err as Error).message);
        }
    }
    
    updateUserById(userId: TGetUserRequestDto, userData: TCreateUserRequestDto): Promise<TUserPersisted> {
        throw new Error("Method not implemented.");
    }
    
    deleteUserById(userId: TGetUserRequestDto): Promise<void> {
        throw new Error("Method not implemented.");
    }
    
    async findUserById(userID: string): Promise<TUserPersisted> {
        
        try {
            const user = await UserModel.findById(userID);

            if(!user){
                throw new Error('Erro ao buscar usuário');
            }
            return {
                id: user._id.toString(),
                username: user.username,
                email: user.email
            }
        } 
        catch(err){
            throw new Error((err as Error).message);
        }
    }
}