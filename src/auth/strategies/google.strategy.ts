import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';
import * as dotenv from 'dotenv';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';
dotenv.config();

@Injectable()
export class GoogleStatregy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:3030/auth/google/redirect',
      scope: ['profile', 'email'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    this.authService.googleLogin({
      email: profile.emails[0].value,
      displayName: profile.displayName,
    });
  }
}
