import { Request, Response } from "express";
import { IUserRepository } from "../repositories/IUserRepository";
import { IUserController } from "./IUserController";
import { StatusCodes } from "http-status-codes";

export class UserController implements IUserController {

    private userRepository: IUserRepository;

    private constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository;
    }

    public static create(userRepository: IUserRepository){
        return new UserController(userRepository);
    }

    async getUser(_: Request, res: Response): Promise<void> {
        res.status(StatusCodes.OK).json(
            {
                username: "ok",
                email: "ok@ok.com",
                password: "test134"
            }
        );
    }
}