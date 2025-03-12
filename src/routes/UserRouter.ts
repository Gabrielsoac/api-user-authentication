import {  Router } from 'express';
import { UserService } from '../services/UserService';
import { MongoDbUserRepository } from '../repositories/MongodbUserRepository';
import { AuthenticationService } from '../services/AuthenticationService';
import { LoginController } from '../controllers/LoginController';
import { UserController } from '../controllers/UserController';
import { AuthenticationMiddleware } from '../middleware/AuthenticationMiddleware';
import { RegisterUserValidation } from '../middleware/RegisterUserValidation';
import { LoginValidation } from '../middleware/LoginValidation';

const UserRouter = Router();

const userRepository = MongoDbUserRepository.getMongoDbRepository();

const userService = UserService.getUserService(userRepository);
const authenticationService = AuthenticationService.getAuthenticationService(userRepository);

const loginController = LoginController.getLoginController(authenticationService);
const userController = UserController.getUserController(userService, authenticationService);

const authMiddleware = AuthenticationMiddleware.getAuthenticationMiddleware(authenticationService);

UserRouter.post(
    '/register',
    RegisterUserValidation,
    userController.register.bind(userController),
);

UserRouter.post(
    '/login',
    LoginValidation,
    loginController.login.bind(loginController),
)

UserRouter.get(
    '/profile',
    authMiddleware.auth.bind(authMiddleware),
    userController.profile.bind(userController),
)

UserRouter.get(
    '/:id',
    authMiddleware.auth.bind(authMiddleware),
    userController.getUser.bind(userController),
);

UserRouter.get(
    '/',
    authMiddleware.auth.bind(authMiddleware),
    userController.listUsers.bind(userController),
)

UserRouter.put(
    '/:id',
    authMiddleware.auth.bind(authMiddleware),
    userController.updateUser.bind(userController),
)

UserRouter.delete(
    '/:id',
    authMiddleware.auth.bind(authMiddleware),
    userController.deleteUser.bind(userController),
)

export { UserRouter };