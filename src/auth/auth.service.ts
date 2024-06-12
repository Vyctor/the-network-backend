import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { UsersRepositoryService } from '../users/repositories/users-repository.service';
import dayjs from 'dayjs';

export interface SignInInput {
  email: string;
  password: string;
}
export interface SignInOutput {
  token: string;
  expires_in: number;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly usersRepository: UsersRepositoryService,
  ) {}

  public async signIn(input: SignInInput): Promise<SignInOutput> {
    const user = await this.usersRepository.findByEmail(input.email);
    if (!user) {
      throw new UnauthorizedException('Usuário ou senha inválidos');
    }
    const passwordMatch = await compare(input.password, user.password);
    if (!passwordMatch) {
      throw new UnauthorizedException('Usuário ou senha inválidos');
    }
    const token = await this.jwtService.signAsync({
      userId: user.id,
      email: user.email,
      name: user.name,
    });
    const expiresInSeconds = parseInt(
      this.configService.getOrThrow('JWT_EXPIRES_IN_SECONDS'),
    );
    return {
      token,
      expires_in: dayjs().add(expiresInSeconds, 'second').unix(),
    };
  }

  public async validateToken(token: string): Promise<boolean> {
    try {
      await this.jwtService.verifyAsync(token);
      return true;
    } catch (error) {
      return false;
    }
  }
}
