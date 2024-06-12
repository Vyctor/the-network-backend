import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { hash } from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepositoryService } from './repositories/users-repository.service';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);
  constructor(private readonly usersRepository: UsersRepositoryService) {}

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
}
