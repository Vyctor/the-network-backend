import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { InfraModule } from '../infra/infra.module';
import { UsersRepositoryService } from './repositories/users-repository.service';
import { AuthModule } from '../auth/auth.module';
import { FollowsRepositoryService } from './repositories/follows-repository.service';

@Module({
  imports: [InfraModule, AuthModule],
  controllers: [UsersController],
  providers: [UsersService, UsersRepositoryService, FollowsRepositoryService],
  exports: [UsersRepositoryService, FollowsRepositoryService],
})
export class UsersModule {}
