import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { UsersRepositoryService } from '../users/repositories/users-repository.service';
import dayjs from 'dayjs';
import { TokenData } from './dto/auth.dto';

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

  public removeBearerFromToken(token: string): string {
    return token.replace('Bearer ', '');
  }

  public async signIn(input: SignInInput): Promise<SignInOutput> {
    const user = await this.usersRepository.findByEmail(input.email);
    if (!user) {
      throw new UnauthorizedException('Usuário ou senha inválidos');
    }
    const passwordMatch = await compare(input.password, user.password);
    if (!passwordMatch) {
      throw new UnauthorizedException('Usuário ou senha inválidos');
    }
    const expiresInSeconds = parseInt(
      this.configService.getOrThrow('JWT_EXPIRES_IN_SECONDS'),
    );
    const expiresIn = dayjs().add(expiresInSeconds, 'seconds').unix();
    const tokenData: TokenData = {
      userId: user.id,
      email: user.email,
      name: user.name,
      iat: expiresIn,
    };

    const token = await this.jwtService.signAsync(tokenData);
    return {
      token,
      expires_in: expiresIn,
    };
  }

  public async validateToken(token: string): Promise<boolean> {
    try {
      const decodedToken = this.decodeToken(token);
      if (!decodedToken) {
        return false;
      }
      const now = dayjs(new Date()).unix();
      const tokenExpireDate = dayjs.unix(decodedToken.iat).unix();
      const tokenExpired = tokenExpireDate < now;
      if (tokenExpired) {
        return false;
      }
      await this.jwtService.verifyAsync(token);
      return true;
    } catch (error) {
      return false;
    }
  }

  public decodeToken(token: string): TokenData {
    return this.jwtService.decode<{
      userId: number;
      email: string;
      name: string;
      iat: number;
    }>(token);
  }

  public async getUserFromToken(token: string): Promise<{ userid: number }> {
    const decodedToken = this.decodeToken(this.removeBearerFromToken(token));
    return { userid: decodedToken.userId };
  }
}
