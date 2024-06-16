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
    const fullToken = request?.headers['authorization'];
    if (!fullToken) throw new UnauthorizedException('Token not found!');
    const token = this.authService.removeBearerFromToken(fullToken);
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
