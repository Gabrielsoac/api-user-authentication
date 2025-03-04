import { StatusCodes } from "http-status-codes";
import { AuthenticationService } from "../services/AuthenticationService";
import { TCreateUserRequestDto } from "./dtos/TCreateUserRequestDto";
import { TUserResponseDto } from "./dtos/TUserResponseDto";
import { Request, Response } from "express";

/* eslint-disable @typescript-eslint/no-empty-object-type */
export class AuthenticationController {

    private static instance: AuthenticationController

    private authenticationService: AuthenticationService;

    private constructor(authenticationService: AuthenticationService) {
        this.authenticationService = authenticationService;
    }

    public getAuthenticationController(authenticationService: AuthenticationService){
        if(AuthenticationController.instance) {
            return AuthenticationController.instance;
        }

        AuthenticationController.instance = new AuthenticationController(authenticationService);

        return AuthenticationController.instance;
    }

    async registerUser(req: Request<{}, {}, TCreateUserRequestDto>, res: Response<TUserResponseDto | unknown>) {
        try {

            const user = await this.authenticationService.register(
                req.body.username,
                req.body.email,
                req.body.password
            );

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

    async login(req: Request<{}, {}, TLoginUser>, res: Response<TTokenJWT | unknown>) {

        try {
            const token = await this.authenticationService.login(req.body.username, req.body.password);

            res.status(StatusCodes.OK).json(
                {
                    token: token
                }
            );
        } catch(err){
            res.status(StatusCodes.BAD_REQUEST).json(
                {
                    message: (err as Error).message,
                }
            );
        }


    }
}

export type TLoginUser = {
    username: string,
    password: string
} 

export type TTokenJWT = {
    token: string
}