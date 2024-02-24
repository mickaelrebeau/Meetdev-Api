import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthentificationDto, LoginDto } from './dtos/auth.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  async signUp(@Body() body: AuthentificationDto) {
    return await this.authService.signup(body);
  }

  @UseGuards(LocalAuthGuard)
  @Post('/signin')
  async signIn(@Body() body: LoginDto) {
    return await this.authService.signin(body);
  }
}
