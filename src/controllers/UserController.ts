/* eslint-disable @typescript-eslint/no-empty-object-type */
import { Request, Response } from "express";
import { IUserController } from "./IUserController";
import { StatusCodes } from "http-status-codes";
import { IUserService } from "../services/IUserService";
import { TGetUserRequestDto } from "./dtos/TGetUserRequestDto";
import { TUserResponseDto } from "./dtos/TUserResponseDto";
import { TCreateUserRequestDto } from "./dtos/TCreateUserRequestDto";

export class UserController implements IUserController {

    constructor(private userService: IUserService) {
        this.userService = userService;
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
    registerUser(req: Request<{}, {}, TCreateUserRequestDto>, res: Response<TUserResponseDto>): void {
        throw new Error("Method not implemented.");
    }
    updateUser(req: Request<TGetUserRequestDto, {}, TCreateUserRequestDto>, res: Response<TUserResponseDto>): void {
        throw new Error("Method not implemented.");
    }
    deleteUser(req: Request<TGetUserRequestDto>, res: Response<void>): void {
        throw new Error("Method not implemented.");
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