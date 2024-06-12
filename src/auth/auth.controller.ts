import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthInputDto, AuthOutputDto } from './dto/auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @HttpCode(200)
  public async authenticate(
    @Body() auth: AuthInputDto,
  ): Promise<AuthOutputDto> {
    try {
      return await this.authService.signIn(auth);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
