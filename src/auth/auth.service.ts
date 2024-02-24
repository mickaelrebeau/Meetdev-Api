import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as argon2 from 'argon2';
import { AuthentificationDto, LoginDto } from './dtos/auth.dto';
import { JwtService } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
import { UserDto } from 'src/user/dtos/user.dto';

dotenv.config();

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signup(user: AuthentificationDto) {
    const nameExist = await this.userService.getByName(user.displayName);
    const emailExist = await this.userService.getByEmail(user.email);

    if (emailExist || nameExist) {
      throw new UnauthorizedException('Invalid username, email or password');
    }

    const hash = await this.hashData(user.password);

    const newUser = await this.userService.create({
      ...user,
      password: hash,
    });

    return { email: newUser.email, id: newUser.id };
  }

  async signin(body: LoginDto) {
    const user = await this.userService.getByEmail(body.email);
    const passwordMatches = await argon2.verify(user.password, body.password);

    if (user.email !== body.email || !passwordMatches) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const payload = { sub: user.id, email: user.email, id: user.id };

    return {
      token: await this.jwtService.signAsync(payload),
      userId: user.id,
    };
  }

  async googleLogin(profile: UserDto) {
    let user = await this.userService.getByEmail(profile.email);

    if (!user) {
      user = await this.userService.create(profile);
    }

    const payload = { sub: user.id, email: user.email, id: user.id };

    return {
      token: await this.jwtService.signAsync(payload),
    };
  }

  async githubLogin(profile: UserDto) {
    let user = await this.userService.getByUsername(profile.username);

    if (!user) {
      user = await this.userService.create(profile);
    }

    const payload = { sub: user.id, username: user.username, id: user.id };

    return {
      token: await this.jwtService.signAsync(payload),
    };
  }

  async getUserFromAuthenticationToken(token: string) {
    const payload = this.jwtService.verify(token, {
      secret: process.env.JWT_SECRET,
    });

    return payload.sub;
  }

  hashData(data: string) {
    return argon2.hash(data);
  }
}
