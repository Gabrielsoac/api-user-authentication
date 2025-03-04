import 'dotenv/config';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { IUserRepository } from '../repositories/IUserRepository';
import { TUserPersisted } from './TUserPersisted';

export class AuthenticationService {

    private userRepository: IUserRepository;

    constructor(userRepository: IUserRepository){
        this.userRepository = userRepository;
    }

    private SECRET_KEY: string | undefined = process.env.SECRET_KEY;

    public async login (username: string, password: string): Promise<string> {

        try {

            const user = await this.userRepository.findUserByUsername(username);

            if(!user){
                throw new Error('Invalid User or Password');
            }

            const loginSucessful = await bcrypt.compare(password, user.password);

            if(!loginSucessful){
                throw new Error('Invalid User or Password')
            }

            if(this.SECRET_KEY){
                
                const userJWT = jwt.sign(
                    {
                        id: user.id,
                        username: user.username,
                        role: 'ADMIN',
                    },
                    this.SECRET_KEY,
                    {
                        expiresIn: '1h'
                    }
                );
                return userJWT;
            }

            throw new Error('Internal Server Error');
        }
        catch (err) {
            throw new Error((err as Error).message);
        }
    }

    public async register(username: string, password: string, email: string): Promise<TUserPersisted> {
        
        try {

            const userAlreadyExists = await this.userRepository.findUserByUsername(username);

            if(userAlreadyExists){
                throw new Error(`User with username: ${username} already exists`);
            }

            const salt = 10;
            const encryptedPassword = await bcrypt.hash(password, salt);

            const user = this.userRepository.createUser(
                {
                    username,
                    password: encryptedPassword,
                    email,
                }
            );

            return user;

        } 
        catch(err){
            throw new Error((err as Error).message);
        }
    }
}