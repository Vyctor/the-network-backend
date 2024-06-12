import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers['authorization']?.replace('Bearer ', '');
    if (!token) {
      throw new UnauthorizedException(
        'O bearer token de autenticação é obrigatório!',
      );
    }
    const result = await this.authService.validateToken(token);
    if (result === false) {
      throw new UnauthorizedException('Token inválido!');
    }
    return true;
  }
}
