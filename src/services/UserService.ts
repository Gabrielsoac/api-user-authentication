import { TRegisterUserRequestDto } from "../controllers/dtos/TRegisterUserRequestDto";
import { TGetUserRequestDto } from "../controllers/dtos/TGetUserRequestDto";
import { IUserRepository } from "../repositories/IUserRepository";
import { IUserService } from "./IUserService";
import { TUserPersisted } from "./TUserPersisted";

export class UserService implements IUserService {

    private static instance: UserService;
    
    private constructor(private userRepository: IUserRepository){
        this.userRepository = userRepository;
    }

    public static getUserService(userRepository: IUserRepository){

        if(UserService.instance){
            return UserService.instance;
        }

        UserService.instance = new UserService(userRepository);
        return UserService.instance;
    }

    async getUser(id: string): Promise<TUserPersisted> {
        
        try {
            const user = await this.userRepository.findUserById(id);
            if(!user){
                throw new Error('User not found');
            }

            return user;

        } catch(err){
            throw new Error((err as Error).message);
        }
    }

    async getUsers(): Promise<TUserPersisted[]> {
        try {
            return await this.userRepository.findUsers();
        }
        catch(err){
            throw new Error((err as Error).message);
        }
    }

    async createUser(userData: TRegisterUserRequestDto): Promise<TUserPersisted> {
        try {
            const user = await this.userRepository.createUser(userData);

            return user;
        }
        catch(err){
            throw new Error((err as Error).message);
        }
    }

    async updateUser(userId: TGetUserRequestDto, userData: TRegisterUserRequestDto): Promise<TUserPersisted> {
        try{
            const user = await this.userRepository.updateUserById(userId, userData);

            return user;
        }
        catch(err) {
            throw new Error((err as Error).message);
        }
    }

    async deleteUser(userId: string): Promise<void> {

        console.log('Cheguei no delete User');

        try {
            await this.userRepository.deleteUserById(userId);
        }
        catch(err){
            throw new Error((err as Error).message);
        }
    }
}