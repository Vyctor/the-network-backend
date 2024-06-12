import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { InfraModule } from './infra/infra.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [InfraModule, UsersModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
