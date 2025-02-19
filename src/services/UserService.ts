import { TCreateUserRequestDto } from "../controllers/dtos/TCreateUserRequestDto";
import { TGetUserRequestDto } from "../controllers/dtos/TGetUserRequestDto";
import { IUserRepository } from "../repositories/IUserRepository";
import { IUserService } from "./IUserService";
import { TUserPersisted } from "./TUserPersisted";

export class UserService implements IUserService {

    private static UserService: UserService;
    
    private constructor(private userRepository: IUserRepository){
        this.userRepository = userRepository;
    }

    public static getUserSErvice(userRepository: IUserRepository){

        if(UserService.UserService){
            return UserService.UserService;
        }

        UserService.UserService = new UserService(userRepository);
        return UserService.UserService;
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

    async createUser(userData: TCreateUserRequestDto): Promise<TUserPersisted> {
        try {
            const user = await this.userRepository.createUser(userData);

            return user;
        }
        catch(err){
            throw new Error((err as Error).message);
        }
    }

    async updateUser(userId: TGetUserRequestDto, userData: TCreateUserRequestDto): Promise<TUserPersisted> {
        try{
            const user = await this.userRepository.updateUserById(userId, userData);

            return user;
        }
        catch(err) {
            throw new Error((err as Error).message);
        }
    }

    async deleteUser(userId: TGetUserRequestDto): Promise<void> {
        try {
            this.userRepository.deleteUserById(userId);
        }
        catch(err){
            throw new Error((err as Error).message);
        }
    }
}