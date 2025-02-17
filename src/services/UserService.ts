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
            console.log('cheguei no user ser');
            const user = await this.userRepository.findUserById(id);
            console.log('passei pelo user service');
            if(!user){
                throw new Error('User not found');
            }

            return user;

        } catch(err){
            throw new Error((err as Error).message);
        }
    }
}