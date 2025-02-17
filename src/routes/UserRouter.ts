import {  Router } from 'express';
import { UserController } from '../controllers/UserController';
import { MongoDbUserRepository } from '../repositories/MongodbUserRepository';

const  UserRouter = Router();
const userRepository = new MongoDbUserRepository();
const userController = UserController.create(userRepository);

UserRouter.get('/user', userController.getUser);

export { UserRouter };
