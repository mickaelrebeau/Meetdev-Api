import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { DataModule } from './data/data.module';
import { ChatModule } from './chat/chat.module';
import { GatewayModule } from './gateway/gateway.module';
import { LikeModule } from './like/like.module';
import { ImageModule } from './image/image.module';
import { MessageModule } from './message/message.module';

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
    AuthModule,
    DataModule,
    ChatModule,
    GatewayModule,
    LikeModule,
    ImageModule,
    MessageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
