import { IUserRepository } from "../repositories/IUserRepository";
import { IUserService } from "./IUserService";
import { TUserPersisted } from "./TUserPersisted";

export class UserService implements IUserService {
    
    private constructor(private userRepository: IUserRepository){
        this.userRepository = userRepository;
    }

    public static create(userRepository: IUserRepository){
        return new UserService(userRepository);
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
}