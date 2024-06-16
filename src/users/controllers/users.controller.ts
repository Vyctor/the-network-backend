import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpCode,
  Res,
  UseGuards,
  Req,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { UsersService } from '../users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { AuthGuard } from '../../auth/auth.guard';
import { AuthService } from '../../auth/auth.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

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

  @Post('follow/:id')
  @UseGuards(AuthGuard)
  async follow(
    @Res() response: Response,
    @Req() request: Request,
    @Param('id') id: number,
  ) {
    const userLogged = await this.authService.getUserFromToken(
      request.headers.authorization,
    );
    console.log('input:', userLogged, id);

    await this.usersService.follow({
      followerId: userLogged.userid,
      followingId: id,
    });
    return response.status(200).send();
  }

  @Post('unfollow/:id')
  @UseGuards(AuthGuard)
  async unfollow(
    @Res() response: Response,
    @Req() request: Request,
    @Param('id') id: number,
  ) {
    const userLogged = await this.authService.getUserFromToken(
      request.headers.authorization,
    );
    await this.usersService.unfollow({
      followerId: userLogged.userid,
      followingId: id,
    });
    return response.status(200).send();
  }

  @Get(':id/followers')
  @UseGuards(AuthGuard)
  async getFollowers(@Res() response: Response, @Param('id') id: number) {
    const followers = await this.usersService.getUserFollowers(id);
    if (!followers || followers.length === 0) {
      return response.status(200).send({});
    }
    return response
      .status(200)
      .send(followers.map((follower) => follower.toJSON()));
  }
}
