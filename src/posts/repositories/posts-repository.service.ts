import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../infra/prisma/prisma.service';

@Injectable()
export class PostsRepositoryService {
  constructor(private readonly prismaService: PrismaService) {}

  public async create(input: {
    content: string;
    authorId: number;
  }): Promise<void> {
    await this.prismaService.post.create({
      data: {
        content: input.content,
        authorId: input.authorId,
      },
    });
  }
}
