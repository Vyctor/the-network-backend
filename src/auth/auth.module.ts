import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { InfraModule } from '../infra/infra.module';
import { UsersRepositoryService } from '../users/repositories/users-repository.service';
import { AuthGuard } from './auth.guard';

@Module({
  imports: [
    ConfigModule,
    InfraModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      global: true,
      useFactory: async (configService: ConfigService) => {
        return {
          global: true,
          secret: configService.get('JWT_SECRET'),
          signOptions: {
            expiresIn: parseInt(
              configService.getOrThrow('JWT_EXPIRES_IN_SECONDS'),
            ),
          },
        };
      },
    }),
  ],
  providers: [AuthService, UsersRepositoryService, AuthGuard],
  exports: [AuthService, AuthGuard],
  controllers: [AuthController],
})
export class AuthModule {}
