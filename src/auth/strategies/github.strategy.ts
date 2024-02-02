import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-github';
import * as dotenv from 'dotenv';
import { AuthService } from '../auth.service';

dotenv.config();

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: 'http://localhost:3030/auth/github/redirect',
      scope: ['public_profile'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    this.authService.githubLogin({
      username: profile.username,
      displayName: profile.displayName,
    });
  }
}
