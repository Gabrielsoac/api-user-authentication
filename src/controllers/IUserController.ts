/* eslint-disable @typescript-eslint/no-empty-object-type */
import { Request, Response } from "express";
import { TUserResponseDto } from "./dtos/TUserResponseDto";
import { TGetUserRequestDto } from "./dtos/TGetUserRequestDto";
import { TRegisterUserRequestDto } from "./dtos/TRegisterUserRequestDto";

export interface IUserController {
    getUser(req: Request<TGetUserRequestDto, {}, {}>, res: Response<TUserResponseDto>): void
    listUsers(_: Request, res: Response<TUserResponseDto[]>): void
    updateUser(req: Request<TGetUserRequestDto, {}, TRegisterUserRequestDto>, res: Response<TUserResponseDto>): void
    deleteUser(req: Request<TGetUserRequestDto>, res: Response<void>): void
}