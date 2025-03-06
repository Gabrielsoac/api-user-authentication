import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { AuthenticationService } from "../services/AuthenticationService";
import { StatusCodes } from "http-status-codes";


export class AuthenticationMiddleware{
    
    private static instance: AuthenticationMiddleware;
    
    private constructor(private authenticationService: AuthenticationService) {
        this.authenticationService = authenticationService;
    }

    public static getAuthenticationMiddleware(authenticationService: AuthenticationService) {
        if(AuthenticationMiddleware.instance){
            return AuthenticationMiddleware.instance;
        }

        AuthenticationMiddleware.instance = new AuthenticationMiddleware(authenticationService);

        return AuthenticationMiddleware.instance;
    }

    public async auth (req: Request & {user?: JwtPayload | null}, res: Response, next: NextFunction) {

        try {
            const authHeader = req.headers['authorization'];

            const token = authHeader && authHeader.split(' ')[1];
    
            if(!token) throw new Error('Token Missing');
    
            const userData = await this.authenticationService.validateToken(token);
    
            req.user = userData;
            next();
        }
        catch(err){
            res.status(StatusCodes.UNAUTHORIZED)
            .json(
                {
                    code: StatusCodes.UNAUTHORIZED,
                    message: (err as Error).message
                }
            )
        }
    }
}
    