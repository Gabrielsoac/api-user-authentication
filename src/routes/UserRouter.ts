import {  Router } from 'express';
import { UserController } from '../controllers/UserController';
import { UserService } from '../services/UserService';
import { MongoDbUserRepository } from '../repositories/MongodbUserRepository';
import { AuthenticationController } from '../controllers/AuthenticationController';
import { AuthenticationService } from '../services/AuthenticationService';

const UserRouter = Router();

const userRepository = MongoDbUserRepository.getMongoDbRepository();
const userService = UserService.getUserService(userRepository);
const userController = UserController.getUserController(userService);

const authenticationService = AuthenticationService.getAuthenticationService(userRepository);
const authenticationController = AuthenticationController.getAuthenticationController(authenticationService);

UserRouter.get(
    '/:id',
    userController.getUser.bind(userController)
);

UserRouter.post(
    '/register',
    authenticationController.registerUser.bind(authenticationController)
);

UserRouter.post(
    '/login',
    authenticationController.login.bind(authenticationController),
)

export { UserRouter };