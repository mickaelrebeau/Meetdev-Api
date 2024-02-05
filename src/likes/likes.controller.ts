import { Controller, Post, Param, Get } from '@nestjs/common';
import { LikesService } from './likes.service';

@Controller('likes')
export class LikesController {
  constructor(private readonly likeService: LikesService) {}

  @Post(':fromUserId/like/:toUserId')
  async likeUser(
    @Param('fromUserId') fromUserId: string,
    @Param('toUserId') toUserId: string,
  ) {
    return this.likeService.likeUser(fromUserId, toUserId);
  }

  @Get(':userId/matches')
  async getMatches(@Param('userId') userId: string) {
    return this.likeService.getMatches(userId);
  }
}
