import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthentificationDto } from './dtos/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  async signUp(@Body() body: AuthentificationDto) {
    return await this.authService.signup(body);
  }

  @Post('/signin')
  async signIn(@Body() body: AuthentificationDto) {
    return await this.authService.signin(body);
  }
}
