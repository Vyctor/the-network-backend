import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { InfraModule } from './infra/infra.module';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [InfraModule, UsersModule, AuthModule, PostsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
