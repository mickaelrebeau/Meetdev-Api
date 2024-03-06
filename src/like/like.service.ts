import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like } from './model/like.entity';
import { Repository } from 'typeorm';
import { ChatService } from 'src/chat/chat.service';

@Injectable()
export class LikeService {
  constructor(
    @InjectRepository(Like)
    private readonly likeRepository: Repository<Like>,
    private readonly chatService: ChatService,
  ) {}

  async likeUser(fromUserId: string, toUserId: string): Promise<Like[]> {
    const existingLike = await this.likeRepository.findOne({
      where: [{ fromUserId: toUserId, toUserId: fromUserId }],
    });

    const alreadyLiked = await this.likeRepository.findOne({
      where: [{ fromUserId, toUserId }],
    });

    if (existingLike) {
      existingLike.isMatch = true;

      const users = [fromUserId, toUserId];

      await this.chatService.createChat({ users });

      return this.likeRepository.save([existingLike]);
    }

    if (alreadyLiked) {
      return [alreadyLiked];
    }

    const like = this.likeRepository.create({
      fromUserId,
      toUserId,
    });

    return this.likeRepository.save([like]);
  }

  async getMatches(userId: string): Promise<Like[]> {
    return this.likeRepository
      .createQueryBuilder('like')
      .where('(like.fromUserId = :userId) OR (like.toUserId = :userId)', {
        userId,
      })
      .andWhere({ isMatch: true })
      .getMany();
  }
}
