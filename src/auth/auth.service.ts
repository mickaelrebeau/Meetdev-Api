import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/user/model/user.entity';
import { UserService } from 'src/user/user.service';
import * as argon2 from 'argon2';
import { AuthentificationDto } from './dtos/auth.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async signup(user: AuthentificationDto): Promise<User> {
    const emailExist = await this.userService.getByEmail(user.email);

    if (emailExist) {
      throw new Error('Error email or password invalid');
    }

    const hash = await this.hashData(user.password);

    return await this.userService.create({
      ...user,
      password: hash,
    });
  }

  async signin(body: AuthentificationDto) {
    const user = await this.userService.getByEmail(body.email);
    const passwordMatches = await argon2.verify(user.password, body.password);

    if (user.email !== body.email || !passwordMatches) {
      throw new UnauthorizedException();
    }

    return user;
  }

  hashData(data: string) {
    return argon2.hash(data);
  }
}
