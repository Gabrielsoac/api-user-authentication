/* eslint-disable @typescript-eslint/no-empty-object-type */
import { Request, Response } from "express";
import { IUserController } from "./IUserController";
import { StatusCodes } from "http-status-codes";
import { IUserService } from "../services/IUserService";
import { TGetUserRequestDto } from "./dtos/TGetUserRequestDto";
import { TUserResponseDto } from "./dtos/TUserResponseDto";
import { TCreateUserRequestDto } from "./dtos/TCreateUserRequestDto";

export class UserController implements IUserController {

    private static UserController: UserController;

    private constructor(private userService: IUserService) {
        this.userService = userService;
    }

    public static getUserController(userService: IUserService){

        if(UserController.UserController){
            return UserController.UserController;
        }

        UserController.UserController = new UserController(userService);

        return UserController.UserController;

    }

    async listUsers(_: Request, res: Response<TUserResponseDto[]>) {
        try {
            const users = await this.userService.getUsers();
            res.status(StatusCodes.OK).json(users);
        }
        catch(err){
            throw new Error((err as Error).message);
        }
    }

    async registerUser(req: Request<{}, {}, TCreateUserRequestDto>, res: Response<TUserResponseDto | unknown>) {
        try {

            const user = await this.userService.createUser({...req.body});

            return res.status(StatusCodes.CREATED).json({...user});

        } catch(err){
            res.status(StatusCodes.BAD_REQUEST).json(
                {
                    code: StatusCodes.BAD_REQUEST,
                    message: (err as Error).message
                }
            )
        }
    }

    async updateUser(req: Request<TGetUserRequestDto, {}, TCreateUserRequestDto>, res: Response<TUserResponseDto | unknown>) {
        try {
                const user = await this.userService.updateUser({...req.params}, {...req.body});
                
                res.status(StatusCodes.OK).json({...user});
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

    async deleteUser(req: Request<TGetUserRequestDto>, res: Response<void | unknown>) {
        try {
            this.userService.deleteUser({...req.params});    

            res.status(StatusCodes.OK).end()
        }
        catch(err){
            res.status(StatusCodes.BAD_REQUEST).json(
                {
                    code: StatusCodes.BAD_REQUEST,
                    message: (err as Error).message
                }
            );
        }
    }

    async getUser(req: Request<TGetUserRequestDto>, res: Response<TUserResponseDto | unknown>) {

        try {
            const user = await this.userService.getUser(req.params.id);
            res.status(StatusCodes.OK).json(user);
        } catch(err) {
            res.status(StatusCodes.NOT_FOUND).json(
                {
                    code: StatusCodes.NOT_FOUND,
                    message: ((err as Error).message)
                }
            )
        }
    }
}