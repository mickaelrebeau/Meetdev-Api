import { Controller, Post, Param, Get } from '@nestjs/common';
import { LikeService } from './like.service';

@Controller('likes')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

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
