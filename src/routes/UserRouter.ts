import {  Router } from 'express';
import { UserController } from '../controllers/UserController';
import { UserService } from '../services/UserService';
import { MongoDbUserRepository } from '../repositories/MongodbUserRepository';

const UserRouter = Router();

const userRepository = MongoDbUserRepository.getMongoDbRepository();
const userService = UserService.getUserSErvice(userRepository);
const userController = UserController.getUserController(userService);

UserRouter.get('/user/:id', userController.getUser.bind(userController));

export { UserRouter };
