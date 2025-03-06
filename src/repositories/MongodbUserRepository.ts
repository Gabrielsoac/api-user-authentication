/* eslint-disable @typescript-eslint/no-empty-object-type */
// import { UserModel } from "../database/model/UserSchema";
import { TRegisterUserRequestDto } from "../controllers/dtos/TRegisterUserRequestDto";
import { TGetUserRequestDto } from "../controllers/dtos/TGetUserRequestDto";
import { UserModel } from "../database/model/UserSchema";
import { TUserPersisted } from "../services/TUserPersisted";
import { IUserRepository } from "./IUserRepository";
import mongoose, { Document } from "mongoose";
import { TUserProps } from "../database/model/TUserProps";

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

    async findUserByEmail(email: string): Promise<TUserPersisted | null> {
        try {
            const user = await UserModel.findOne({email: email});

            if(!user){
                return null;
            }

            return this.createTUSerPersisted(user);
        }   
        catch(err) {
            throw new Error((err as Error).message);
        }
    }

    async findUserByUsername(username: string): Promise<TUserPersisted | null> {

        try {
            const user = await UserModel.findOne(
                {
                    username
                }
            );

            if(!user){
                return null;
            }

            return this.createTUSerPersisted(user);
        } catch(err){
            throw new Error((err as Error).message);
        }
    }
    
    async findUsers(): Promise<TUserPersisted[]> {
        try {
            const users = await UserModel.find();

            const usersPersisted = users.map(
                (x) => {
                    return this.createTUSerPersisted(x);
                }
            );

            return usersPersisted;
        }
        catch(err){
            throw new Error((err as Error).message);
        }
    }
    
    async createUser(userData: TRegisterUserRequestDto): Promise<TUserPersisted> {
        try {
            const user = await UserModel.create(
                {...userData}
            );

            return {
                id: user._id.toString(),
                username: user.username,
                email: user.email,
                password: user.password,
                role: user.role
            }
        }
        catch(err){
            throw new Error((err as Error).message);
        }
    }
    
    async updateUserById(userId: TGetUserRequestDto, userData: TRegisterUserRequestDto): Promise<TUserPersisted> {
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
                throw new Error('User not found');
            }

            return this.createTUSerPersisted(user);
        }
        catch(err){
            throw new Error((err as Error).message);
        }
    }
    
    async deleteUserById(userId: TGetUserRequestDto): Promise<void> {
        try {
            const user = await UserModel.findByIdAndDelete(userId.id);

            if(!user){
                throw new Error('User not found');
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

            return this.createTUSerPersisted(user);
        }
        catch(err){
            throw new Error((err as Error).message);
        }
    }

    private createTUSerPersisted(user: Document<unknown, {}, TUserProps> & TUserProps & {_id: mongoose.Types.ObjectId}): TUserPersisted {
        return {
            id: user._id.toString(),
            username: user.username,
            email: user.email,
            password: user.password,
            role: user.role
        } 
    }
}