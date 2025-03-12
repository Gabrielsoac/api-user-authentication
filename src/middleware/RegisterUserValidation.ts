import * as yup from 'yup'
import { validation } from './Validation';
import { TRegisterUserRequestDto } from '../controllers/dtos/TRegisterUserRequestDto';
import { TUserRole } from '../database/model/TUserProps';

const bodyValidation: yup.ObjectSchema<TRegisterUserRequestDto> =
    yup.object().shape(
        {
            username: yup.string().required().min(4),
            email: yup.string().required().email().min(6),
            password:  yup.string()
            .required()
            .min(8, 'A senha precisa ser pelo menos 8 caracteres')
            .matches(/[A-Z]/, 'A senha precisa ter pelo menos 1 caractere maiúsculo')
            .matches(/[a-z]/, 'A senha precisa ter pelo menos 1 caractere minúsculo')
            .matches(/\d/, 'A senha deve conter pelo menos 1 número')
            .matches(/[@$!%*?&#]/, 'A senha deve conter pelo menos um caractere especial'),
            role: yup.mixed<TUserRole>().required().oneOf(['ADMIN', 'USER'], "Role can be only ADMIN or USER")
        }
    );

const fields = {
    body: bodyValidation,
}

export const RegisterUserValidation = validation(fields);