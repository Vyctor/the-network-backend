import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../infra/prisma/prisma.service';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersRepositoryService {
  constructor(private readonly prismaService: PrismaService) {}

  public async createUser(input: {
    email: string;
    name: string;
    password: string;
  }): Promise<void> {
    await this.prismaService.user.create({
      data: {
        email: input.email,
        name: input.name,
        password: input.password,
      },
    });
  }

  public async findByEmail(email: string): Promise<User | null> {
    const databaseUser = await this.prismaService.user.findUnique({
      where: { email },
    });

    if (!databaseUser) {
      return null;
    }

    return new User({
      id: databaseUser.id,
      email: databaseUser.email,
      name: databaseUser.name,
      password: databaseUser.password,
      created_at: databaseUser.createdAt,
      updated_at: databaseUser.updatedAt,
    });
  }

  public async findById(id: number): Promise<User | null> {
    const databaseUser = await this.prismaService.user.findUnique({
      where: { id },
    });
    if (!databaseUser) {
      return null;
    }
    return new User({
      id: databaseUser.id,
      email: databaseUser.email,
      name: databaseUser.name,
      password: databaseUser.password,
      created_at: databaseUser.createdAt,
      updated_at: databaseUser.updatedAt,
    });
  }

  public async findAll(): Promise<User[]> {
    const databaseUsers = await this.prismaService.user.findMany();
    return databaseUsers.map((databaseUser) => {
      return new User({
        id: databaseUser.id,
        email: databaseUser.email,
        name: databaseUser.name,
        password: databaseUser.password,
        created_at: databaseUser.createdAt,
        updated_at: databaseUser.updatedAt,
      });
    });
  }
}
