import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UpdateResult } from 'typeorm';
import { GoogleUser } from './model/google.entity';
import { GoogleUserService } from './google-user.service';

@Controller('google-user')
export class GoogleUserController {
  constructor(private readonly userService: GoogleUserService) {}

  @Get()
  getAll(): Promise<GoogleUser[]> {
    return this.userService.getAll();
  }

  @Get(':id')
  getById(@Param('id') id: string): Promise<GoogleUser | null> {
    return this.userService.getById(id);
  }

  @Post()
  create(@Body() user: GoogleUser): Promise<GoogleUser> {
    return this.userService.create(user);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() user: GoogleUser,
  ): Promise<UpdateResult> {
    return this.userService.update(id, user);
  }

  @Delete(':id')
  destroy(@Param('id') id: string): Promise<void> {
    return this.userService.delete(id);
  }
}
