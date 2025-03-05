import { StatusCodes } from "http-status-codes";
import { AuthenticationService } from "../services/AuthenticationService";
import { TLoginUserResponseDto } from "./dtos/TLoginUserResponseDto";
import { Request, Response } from "express";

/* eslint-disable @typescript-eslint/no-empty-object-type */
export class LoginController {

    private static instance: LoginController;

    private authenticationService: AuthenticationService;

    private constructor(authenticationService: AuthenticationService) {
        this.authenticationService = authenticationService;
    }

    public static getLoginController(authenticationService: AuthenticationService){
        if(LoginController.instance) {
            return LoginController.instance;
        }

        LoginController.instance = new LoginController(authenticationService);

        return LoginController.instance;
    }

    async login(req: Request<{}, {}, TLoginUser>, res: Response<TLoginUserResponseDto | TError>) {

        try {
            const token = await this.authenticationService.login({...req.body});

            res.status(StatusCodes.OK).json(
                {
                    token: token
                }
            );
        } catch(err){
            res.status(StatusCodes.BAD_REQUEST).json(
                {
                    code: StatusCodes.BAD_REQUEST,
                    message: (err as Error).message,
                }
            );
        }
    }
}

export type TError = {
    code: number,
    message: string
}

export type TLoginUser = {
    username: string,
    password: string
}