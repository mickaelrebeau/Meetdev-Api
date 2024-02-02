import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { AvatarModule } from './avatar/avatar.module';
import { AuthModule } from './auth/auth.module';
import { DataModule } from './data/data.module';
import { GoogleUserModule } from './google-user/google-user.module';
import { GithubUserModule } from './github-user/github-user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string(),
        POSTGRES_DB: Joi.string().required(),
      }),
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'images'),
      serveRoot: '/images',
    }),
    DatabaseModule,
    UserModule,
    AvatarModule,
    AuthModule,
    DataModule,
    GoogleUserModule,
    GithubUserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
