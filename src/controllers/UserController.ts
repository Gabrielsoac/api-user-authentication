/* eslint-disable @typescript-eslint/no-empty-object-type */
import { Request, Response } from "express";
import { IUserController } from "./IUserController";
import { StatusCodes } from "http-status-codes";
import { IUserService } from "../services/IUserService";
import { TGetUserRequestDto } from "./dtos/TGetUserRequestDto";
import { TUserResponseDto } from "./dtos/TUserResponseDto";
import { TRegisterUserRequestDto } from "./dtos/TRegisterUserRequestDto";
import { AuthenticationService } from "../services/AuthenticationService";
import { TError } from "./LoginController";
import { JwtPayload } from "jsonwebtoken";

export class UserController implements IUserController {

    private static instance: UserController;

    private constructor(private userService: IUserService, private authenticationService: AuthenticationService) {
        this.userService = userService;
        this.authenticationService = authenticationService;
    }

    public static getUserController(userService: IUserService, authenticationService: AuthenticationService){

        if(UserController.instance){
            return UserController.instance;
        }

        UserController.instance = new UserController(userService, authenticationService);

        return UserController.instance;
    }

    async listUsers(req: Request & {user?: JwtPayload}, res: Response<TUserResponseDto[] | TError>): Promise<void> {
        try {

            if(!req.user || req.user.role !== 'ADMIN'){
                res.status(StatusCodes.UNAUTHORIZED).json(
                    {
                        code: StatusCodes.UNAUTHORIZED,
                        message: 'Unauthorized'
                    }
                );
                
                return;
            }

            const users = await this.userService.getUsers();
            res.status(StatusCodes.OK).json(users);

            return;
        }
        catch {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json(
                {
                    code: StatusCodes.INTERNAL_SERVER_ERROR,
                    message: 'Internal Server Error'
                }
            );
        }
    }

    async updateUser(req: Request<TGetUserRequestDto, {}, TRegisterUserRequestDto> & {user?: JwtPayload}, res: Response<TUserResponseDto | TError>) {
        
        try {

            const user = await this.userService.getUser(req.params.id);

            if(!req.user || req.user.role !== 'ADMIN' && user.role !== 'USER'){
                res.status(StatusCodes.UNAUTHORIZED).json(
                    {
                        code: StatusCodes.UNAUTHORIZED,
                        message: 'Unauthorized'
                    }
                )
                return;
            }

            if(req.user.role === 'USER' && user.role === 'ADMIN'){
                res.status(StatusCodes.BAD_REQUEST)
                .json(
                    {
                        code: StatusCodes.BAD_REQUEST,
                        message: 'A not admin user cannot make other admin user'
                    }
                );
            }

            if(req.user.role !== "ADMIN" && req.body.role === "ADMIN"){
                res.status(StatusCodes.UNAUTHORIZED)
                .json(
                    {
                        code: StatusCodes.UNAUTHORIZED,
                        message: `Users can't be admin` 
                    }
                );

                return;
            }

            if (req.user.role === 'ADMIN'){

                await this.userService.updateUser(user, {...req.body});    

                res.status(StatusCodes.OK).end();
                return;
            }

            if(req.user.id !== req.params.id){
                res.status(StatusCodes.UNAUTHORIZED).json(
                    {
                        code: StatusCodes.UNAUTHORIZED,
                        message: 'Unauthorized'
                    }
                );
                return;
            }

            const userUpdated = await this.userService.updateUser(user, {...req.body});

            res.status(StatusCodes.OK).json(
                {
                    ...userUpdated
                }
            );

            return;
        }

        catch(err) {
            res.status(StatusCodes.BAD_REQUEST).json(
                {
                    code: StatusCodes.BAD_REQUEST,
                    message: (err as Error).message
                }
            );
        }
    }

    async deleteUser(req: Request<TGetUserRequestDto> & {user?: JwtPayload}, res: Response<void | TError>): Promise<void> {
        
        try {

            if(!req.user || req.user.role !== 'ADMIN' && req.user.role !== 'USER'){
                res.status(StatusCodes.UNAUTHORIZED).json(
                    {
                        code: StatusCodes.UNAUTHORIZED,
                        message: 'Unauthorized'
                    }
                )
                return;
            }

            else if (req.user.role === 'ADMIN'){

                await this.userService.deleteUser(req.params.id);    

                res.status(StatusCodes.OK).end();
                return;
            }

            else {

                if(req.user.id !== req.params.id){
                    res.status(StatusCodes.UNAUTHORIZED).json(
                        {
                            code: StatusCodes.UNAUTHORIZED,
                            message: 'Unauthorized'
                        }
                    );

                    return;
                }

                await this.userService.deleteUser(req.params.id);

                res.status(StatusCodes.NO_CONTENT).end();

                return;
            }
        }
        catch(err){
            res.status(StatusCodes.BAD_REQUEST).json(
                {
                    code: StatusCodes.BAD_REQUEST,
                    message: (err as Error).message
                }
            )
            return;
        }
    }

    async getUser(req: Request<TGetUserRequestDto> & {user?: JwtPayload}, res: Response<TUserResponseDto | unknown>): Promise<void> {

        try {

            if(!req.user) {
                throw new Error('Token Missing');
            }

            if(req.user.role === 'USER' || req.user.role ==='ADMIN') {
                const user = await this.userService.getUser(req.params.id);
            
                res.status(StatusCodes.OK).json(
                    {
                        id: user.id,
                        username: user.username,
                        email: user.email
                    }
                );

                return;

            } else {
                res.status(StatusCodes.UNAUTHORIZED).json(
                    {
                        code: StatusCodes.UNAUTHORIZED,
                        message: "Unauthorized!"
                    }
                );
                return;
            }

        } catch(err) {
            res.status(StatusCodes.NOT_FOUND).json(
                {
                    code: StatusCodes.NOT_FOUND,
                    message: ((err as Error).message)
                }
            )

            return;
        }               
    }

    async profile(req: Request & {user?: JwtPayload}, res: Response<TUserResponseDto | TError>): Promise<void> {

        try {
            if(!req.user){
                throw new Error('INTERNAL SERVER ERROR');
            }

            const user = await this.userService.getUser(req.user.id);

            res.status(StatusCodes.OK)
            .json(user);

            return;
        }
        catch(err){
            res.status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json(
                {
                    code: StatusCodes.INTERNAL_SERVER_ERROR,
                    message: (err as Error).message
                }
            )

            return;
        }
    }

    async register(req: Request<{}, {}, TRegisterUserRequestDto>, res: Response<TUserResponseDto | TError>): Promise<void> {
        
        try {
            const user = await this.authenticationService.register({...req.body});

            res.status(StatusCodes.CREATED).json(
                {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    role: user.role
                }
            );
            return;

        } catch(err){
            res.status(StatusCodes.BAD_REQUEST).json(
                {
                    code: StatusCodes.BAD_REQUEST,
                    message: (err as Error).message
                }
            )
            return;
        }
    }
}