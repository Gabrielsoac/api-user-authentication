/* eslint-disable @typescript-eslint/no-empty-object-type */
import { Request, Response } from "express";
import { TUserResponseDto } from "./dtos/TUserResponseDto";
import { TGetUserRequestDto } from "./dtos/TGetUserRequestDto";
import { TRegisterUserRequestDto } from "./dtos/TRegisterUserRequestDto";
import { TError } from "./LoginController";

export interface IUserController {
    getUser(req: Request<TGetUserRequestDto, {}, {}>, res: Response<TUserResponseDto>): Promise<void>
    listUsers(_: Request, res: Response<TUserResponseDto[]>): Promise<void>
    updateUser(req: Request<TGetUserRequestDto, {}, TRegisterUserRequestDto>, res: Response<TUserResponseDto>): Promise<void>
    deleteUser(req: Request<TGetUserRequestDto>, res: Response<void>): Promise<void>
    register(req: Request<{}, {}, TRegisterUserRequestDto>, res: Response<TUserResponseDto | TError >): Promise<void>
    profile(req: Request, res: Response<TUserResponseDto | TError >): Promise<void>
}