import {  Router } from 'express';
import { UserController } from '../controllers/UserController';
import { UserService } from '../services/UserService';
import { MongoDbUserRepository } from '../repositories/MongodbUserRepository';
import { UserAuthenticationController } from '../controllers/UserAuthenticationController';
import { AuthenticationService } from '../services/AuthenticationService';

const UserRouter = Router();

const userRepository = MongoDbUserRepository.getMongoDbRepository();
const userService = UserService.getUserService(userRepository);
const userController = UserController.getUserController(userService);

const authenticationService = AuthenticationService.getAuthenticationService(userRepository);
const authenticationController = UserAuthenticationController.getAuthenticationController(authenticationService);

UserRouter.get(
    '/:id',
    userController.getUser.bind(userController)
);

UserRouter.post(
    '/register',
    authenticationController.register.bind(authenticationController)
);

UserRouter.post(
    '/login',
    authenticationController.login.bind(authenticationController),
)

export { UserRouter };