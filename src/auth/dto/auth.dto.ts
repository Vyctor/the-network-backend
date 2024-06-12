import { IsEmail, IsString } from 'class-validator';

export class AuthInputDto {
  @IsEmail({}, { message: 'Email inválido!' })
  email: string;
  @IsString({ message: 'Senha inválida!' })
  password: string;
}

export interface AuthOutputDto {
  token: string;
  expires_in: number;
}
