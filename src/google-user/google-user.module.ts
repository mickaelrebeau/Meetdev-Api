import { Module } from '@nestjs/common';
import { GoogleUserService } from './google-user.service';
import { GoogleUserController } from './google-user.controller';
import { GoogleUser } from './model/google.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([GoogleUser])],
  providers: [GoogleUserService],
  controllers: [GoogleUserController],
})
export class GoogleUserModule {}
