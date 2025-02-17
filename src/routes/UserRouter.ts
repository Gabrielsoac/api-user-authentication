import {  Router } from 'express';
import { UserController } from '../controllers/UserController';
import { UserService } from '../services/UserService';
import { MongoDbUserRepository } from '../repositories/MongodbUserRepository';

const UserRouter = Router();

const userRepository = new MongoDbUserRepository();
const userService = UserService.create(userRepository);
const userController = new UserController(userService);

UserRouter.get('/user/:id', userController.getUser.bind(userController));

export { UserRouter };
