import * as yup from 'yup'
import { TLoginUserRequestDto } from '../controllers/dtos/TLoginUserRequestDto';
import { validation } from './Validation';


const bodyValidation: yup.ObjectSchema<TLoginUserRequestDto> =
    yup.object().shape(
        {
            username: yup.string().required(),
            password:  yup.string().required()
        }
    );

const fields = {
    body: bodyValidation,
}

export const LoginValidation = validation(fields);