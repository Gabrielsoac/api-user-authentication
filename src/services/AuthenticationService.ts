import 'dotenv/config';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs'
import { IUserRepository } from '../repositories/IUserRepository';
import { TUserPersisted } from './TUserPersisted';
import { TRegisterUserRequestDto } from '../controllers/dtos/TRegisterUserRequestDto';
import { TLoginUserRequestDto } from '../controllers/dtos/TLoginUserRequestDto';

export class AuthenticationService {

    private userRepository: IUserRepository;

    private static instance: AuthenticationService;

    private SECRET_KEY: string | undefined = process.env.SECRET_KEY;


    private constructor(userRepository: IUserRepository){
        this.userRepository = userRepository;
    }

    public static getAuthenticationService(userRepository: IUserRepository){
        if(AuthenticationService.instance){
            return AuthenticationService.instance;
        }

        AuthenticationService.instance = new AuthenticationService(userRepository);

        return AuthenticationService.instance;
    }

    public async login (data: TLoginUserRequestDto): Promise<string> {

        try {

            const user = await this.userRepository.findUserByUsername(data.username);

            if(!user){
                throw new Error('Invalid User or Password');
            }

            const loginSucessful = await bcrypt.compare(data.password, user.password);

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

    public async register(data: TRegisterUserRequestDto): Promise<TUserPersisted> {

        try {

            const usernameAlreadyExists = await this.userRepository.findUserByUsername(data.username);
            const emailAlreadyExists = await this.userRepository.findUserByEmail(data.email);

            if(usernameAlreadyExists) {
                throw new Error(`User with username ${data.username} already exists`);
            }

            if(emailAlreadyExists){
                throw new Error(`User with email ${data.email} already exists`);
            }

            const saltRounds = await bcrypt.genSalt(10);

            const encryptedPassword = await bcrypt.hash(data.password, saltRounds);

            const user = await this.userRepository.createUser(
                {
                    username: data.username,
                    email: data.email,
                    password: encryptedPassword,
                }
            );

            return user;

        } 
        catch(err){
            throw new Error((err as Error).message);
        }
    }
}