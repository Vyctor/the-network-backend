import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail(
    {},
    {
      message: 'Email precisa ser um email válido',
    },
  )
  email: string;

  @IsString({
    message: 'Nome precisa ser uma string',
  })
  @IsNotEmpty({
    message: 'Nome não pode ser vazio',
  })
  name: string;

  @IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 1,
      minNumbers: 1,
    },
    {
      message:
        'Senha precisa ter no mínimo 8 caracteres, 1 letra minúscula e 1 número',
    },
  )
  password: string;
}
