import * as yup from 'yup'
import { validation } from './Validation';
import { TGetUserRequestDto } from '../controllers/dtos/TGetUserRequestDto';

const paramsValidation: yup.ObjectSchema<TGetUserRequestDto> =
    yup.object().shape(
        {
            id: yup.string().required().max(24).min(24),
        }
    );

const fields = {
    params: paramsValidation
}

export const FindUserByIdDataValidation = validation(fields);