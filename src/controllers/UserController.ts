import { Request, Response } from "express";
import { IUserController } from "./IUserController";
import { StatusCodes } from "http-status-codes";
import { IUserService } from "../services/IUserService";

export class UserController implements IUserController {

    constructor(private userService: IUserService) {
        this.userService = userService;
    }

    async getUser(req: Request, res: Response) {

        try {
            console.log('Cheguei no Controller');
            console.log(req.params.id);
            console.log(this.userService);
            const user = await this.userService.getUser(req.params.id);
            console.log('passei do controller');
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