// import { UserModel } from "../database/model/UserSchema";
import { TCreateUserRequestDto } from "../controllers/dtos/TCreateUserRequestDto";
import { TGetUserRequestDto } from "../controllers/dtos/TGetUserRequestDto";
import { UserModel } from "../database/model/UserSchema";
import { TUserPersisted } from "../services/TUserPersisted";
import { IUserRepository } from "./IUserRepository";

export class MongoDbUserRepository implements IUserRepository {

    private static instance: MongoDbUserRepository;

    private constructor(){

    }

    public static getMongoDbRepository(): MongoDbUserRepository {
        if(MongoDbUserRepository.instance){
            return MongoDbUserRepository.instance;
        }

        MongoDbUserRepository.instance = new MongoDbUserRepository();
        return MongoDbUserRepository.instance;
    }

    async findUserByUsername(username: string): Promise<TUserPersisted | null> {
        
        try {

            const user = await UserModel.findOne(
                {
                    username: username
                }
            );

            if(!user){
                return null;
            }

            return {
                id: user._id.toString(),
                username: user.username,
                email: user.email,
                password: user.password
            }
        } catch(err){
            throw new Error((err as Error).message);
        }
    }
    
    async findUsers(): Promise<TUserPersisted[]> {
        try {
            const users = await UserModel.find();

            const usersPersisted = users.map(
                (x) => {
                    return {
                        id: x._id.toString(),
                        username: x.username,
                        email: x.email,
                        password: x.password
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
                email: user.email,
                password: user.password
            }
        }
        catch(err){
            throw new Error((err as Error).message);
        }
    }
    
    async updateUserById(userId: TGetUserRequestDto, userData: TCreateUserRequestDto): Promise<TUserPersisted> {
        try {

            const user = await UserModel.findOneAndUpdate(
                {
                    _id: userId.id
                },
                {
                    username: userData.username,
                    email: userData.email,
                    password: userData.password
                },
                {
                    new: true
                }
            );

            if(!user){
                throw new Error('Não foi possível atualizar usuário: Usuário não existe');
            }

            return {
                id: user.id.toString(),
                username: user.username,
                email: user.email,
                password: user.password
            };
        }
        catch(err){
            throw new Error((err as Error).message);
        }
    }
    
    async deleteUserById(userId: TGetUserRequestDto): Promise<void> {
        try {
            const user = await UserModel.findByIdAndDelete(userId.id);

            if(!user){
                throw new Error('Usuário com este ID não existe, portanto não pode ser deletado');
            }
        }
        catch(err){
            throw new Error((err as Error).message);
        }
    }
    
    async findUserById(userID: string): Promise<TUserPersisted | null> {
        
        try {
            
            const user = await UserModel.findById(userID);

            if(!user){
                return null;
            }

            return {
                id: user._id.toString(),
                username: user.username,
                email: user.email,
                password: user.password
            }
        }
        catch(err){
            throw new Error((err as Error).message);
        }
    }
}