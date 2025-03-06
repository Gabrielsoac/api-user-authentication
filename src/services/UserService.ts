import { TRegisterUserRequestDto } from "../controllers/dtos/TRegisterUserRequestDto";
import { IUserRepository } from "../repositories/IUserRepository";
import { EncryptPassword } from "./EncryptPassword";
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

    async updateUser(user: TUserPersisted, userData: TRegisterUserRequestDto): Promise<TUserPersisted> {
        
        try{
            const usernameAlreadyExists = await this.userRepository.findUserByUsername(userData.username);
            const emailAlreadyExists = await this.userRepository.findUserByEmail(userData.email);

            if(usernameAlreadyExists && usernameAlreadyExists.username !== user.username){
                throw new Error(`User with username ${userData.email} already exists`);
            }

            if(emailAlreadyExists && emailAlreadyExists.email !== user.email){
                throw new Error(`User with email ${userData.email} already exists`);
            }

            const userUpdated = await this.userRepository.updateUserById(
                user.id,
                {
                    username: userData.username,
                    email: userData.email,
                    password: await EncryptPassword(userData.password),
                    role: userData.role
                }
            );
            return userUpdated;
        }
        catch(err) {
            throw new Error((err as Error).message);
        }
    }

    async deleteUser(userId: string): Promise<void> {

        try {
            await this.userRepository.deleteUserById(userId);
        }
        catch(err){
            throw new Error((err as Error).message);
        }
    }
}