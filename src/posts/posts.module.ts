import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { PrismaService } from '../infra/prisma/prisma.service';
import { InfraModule } from '../infra/infra.module';
import { PostsRepositoryService } from './repositories/posts-repository.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [InfraModule, AuthModule],
  controllers: [PostsController],
  providers: [PrismaService, PostsService, PostsRepositoryService],
})
export class PostsModule {}
