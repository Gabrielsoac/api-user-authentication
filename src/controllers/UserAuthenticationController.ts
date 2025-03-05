import { StatusCodes } from "http-status-codes";
import { AuthenticationService } from "../services/AuthenticationService";
import { TRegisterUserRequestDto } from "./dtos/TRegisterUserRequestDto";
import { TUserResponseDto } from "./dtos/TUserResponseDto";
import { Request, Response } from "express";
import { TLoginUserResponseDto } from "./dtos/TLoginUserResponseDto";

/* eslint-disable @typescript-eslint/no-empty-object-type */
export class UserAuthenticationController {

    private static instance: UserAuthenticationController;

    private authenticationService: AuthenticationService;

    private constructor(authenticationService: AuthenticationService) {
        this.authenticationService = authenticationService;
    }

    public static getAuthenticationController(authenticationService: AuthenticationService){
        if(UserAuthenticationController.instance) {
            return UserAuthenticationController.instance;
        }

        UserAuthenticationController.instance = new UserAuthenticationController(authenticationService);

        return UserAuthenticationController.instance;
    }

    async register(req: Request<{}, {}, TRegisterUserRequestDto>, res: Response<TUserResponseDto | TError >) {
        
        try {
            const user = await this.authenticationService.register({...req.body});

            res.status(StatusCodes.CREATED).json(
                {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                }
            );

        } catch(err){
            res.status(StatusCodes.BAD_REQUEST).json(
                {
                    code: StatusCodes.BAD_REQUEST,
                    message: (err as Error).message
                }
            )
        }
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