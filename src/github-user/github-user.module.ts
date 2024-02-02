import { Module } from '@nestjs/common';
import { GithubUserService } from './github-user.service';
import { GithubUser } from './model/github.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GithubUserController } from './github-user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([GithubUser])],
  providers: [GithubUserService],
  controllers: [GithubUserController],
})
export class GithubUserModule {}
