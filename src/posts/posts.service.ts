import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { PostsRepositoryService } from './repositories/posts-repository.service';

@Injectable()
export class PostsService {
  constructor(private readonly postsRepository: PostsRepositoryService) {}

  public async create(createPostDto: CreatePostDto) {
    await this.postsRepository.create(createPostDto);
  }
}
