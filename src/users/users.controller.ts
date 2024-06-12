import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpCode,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(201)
  async create(@Body() createUserDto: CreateUserDto): Promise<void> {
    return this.usersService.create(createUserDto);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @HttpCode(200)
  @HttpCode(204)
  async findById(@Res() response: Response, @Param('id') id: number) {
    const user = await this.usersService.findById(id);
    if (!user) {
      return response.status(204).send();
    }
    return response.status(200).send(user.toJSON());
  }

  @Get()
  @UseGuards(AuthGuard)
  async findAll(@Res() response: Response) {
    const users = await this.usersService.findAll();
    if (!users || users.length === 0) {
      return response.status(204).send();
    }
    return response.status(200).send(users.map((user) => user.toJSON()));
  }
}
