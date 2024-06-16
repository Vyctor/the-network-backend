import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { hash } from 'bcrypt';
import { UsersRepositoryService } from './repositories/users-repository.service';
import { FollowsRepositoryService } from './repositories/follows-repository.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);
  constructor(
    private readonly usersRepository: UsersRepositoryService,
    private readonly followsRepository: FollowsRepositoryService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<void> {
    try {
      const hashedPassword = await hash(createUserDto.password, 10);
      await this.usersRepository.createUser({
        name: createUserDto.name,
        password: hashedPassword,
        email: createUserDto.email,
      });
    } catch (err) {
      this.logger.error('Error creating user');
      this.logger.debug(err.message);
      throw new InternalServerErrorException();
    }
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.findAll();
  }

  async findById(id: number): Promise<User | null> {
    return this.usersRepository.findById(id);
  }

  async follow(input: {
    followerId: number;
    followingId: number;
  }): Promise<void> {
    const { followerId, followingId } = input;
    if (followerId === followingId) {
      throw new BadRequestException('User cannot follow himself');
    }
    const follower = await this.usersRepository.findById(followerId);
    if (!follower) {
      throw new BadRequestException('Follower not found');
    }
    const following = await this.usersRepository.findById(followingId);
    if (!following) {
      throw new BadRequestException('Following not found');
    }
    await this.followsRepository.follow({
      followingId,
      followerId,
    });
  }

  async unfollow(input: {
    followerId: number;
    followingId: number;
  }): Promise<void> {
    const { followerId, followingId } = input;
    if (followerId === followingId) {
      throw new BadRequestException('User cannot unfollow himself');
    }
    const follower = await this.usersRepository.findById(followerId);
    if (!follower) {
      throw new BadRequestException('Follower not found');
    }
    const following = await this.usersRepository.findById(followingId);
    if (!following) {
      throw new BadRequestException('Following not found');
    }
    await this.followsRepository.unfollow({
      followingId,
      followerId,
    });
  }

  async getUserFollowers(userId: number) {
    return await this.followsRepository.findFollowersByUserId(userId);
  }
}
