import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { GithubUserService } from './github-user.service';
import { GithubUser } from './model/github.entity';
import { UpdateResult } from 'typeorm';

@Controller('github-user')
export class GithubUserController {
  constructor(private readonly userService: GithubUserService) {}

  @Get()
  getAll(): Promise<GithubUser[]> {
    return this.userService.getAll();
  }

  @Get(':id')
  getById(@Param('id') id: string): Promise<GithubUser | null> {
    return this.userService.getById(id);
  }

  @Post()
  create(@Body() user: GithubUser): Promise<GithubUser> {
    return this.userService.create(user);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() user: GithubUser,
  ): Promise<UpdateResult> {
    return this.userService.update(id, user);
  }

  @Delete(':id')
  destroy(@Param('id') id: string): Promise<void> {
    return this.userService.delete(id);
  }
}
