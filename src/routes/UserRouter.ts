import {  Router } from 'express';
import { UserService } from '../services/UserService';
import { MongoDbUserRepository } from '../repositories/MongodbUserRepository';
import { AuthenticationService } from '../services/AuthenticationService';
import { LoginController } from '../controllers/LoginController';
import { UserController } from '../controllers/UserController';
import { AuthenticationMiddleware } from '../middleware/AuthenticationMiddleware';

const UserRouter = Router();

const userRepository = MongoDbUserRepository.getMongoDbRepository();

const userService = UserService.getUserService(userRepository);
const authenticationService = AuthenticationService.getAuthenticationService(userRepository);

const loginController = LoginController.getLoginController(authenticationService);
const userController = UserController.getUserController(userService, authenticationService);

const authMiddleware = AuthenticationMiddleware.getAuthenticationMiddleware(authenticationService);

UserRouter.get(
    '/:id',
    authMiddleware.auth.bind(authMiddleware),
    userController.getUser.bind(userController)
);

UserRouter.post(
    '/register',
    userController.register.bind(userController)
);

UserRouter.post(
    '/login',
    loginController.login.bind(loginController),
)

export { UserRouter };