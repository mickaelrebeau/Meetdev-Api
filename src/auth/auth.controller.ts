import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthentificationDto, LoginDto } from './dtos/auth.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { GoogleAuthGuard } from './guards/google.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  async signUp(@Body() body: LoginDto) {
    return await this.authService.signup(body);
  }

  @UseGuards(LocalAuthGuard)
  @Post('/signin')
  async signIn(@Body() body: AuthentificationDto) {
    return await this.authService.signin(body);
  }

  @Get('google/login')
  @UseGuards(GoogleAuthGuard)
  async googleLogin() {
    return {
      message: 'Logged in whith Google!',
    };
  }

  @Get('google/redirect')
  @UseGuards(GoogleAuthGuard)
  async googleRedirect() {
    return {
      message: 'Logged in whith Google!',
    };
  }
}
