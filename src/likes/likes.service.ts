import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like } from './model/like.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LikesService {
  constructor(
    @InjectRepository(Like)
    private readonly likeRepository: Repository<Like>,
  ) {}

  async likeUser(fromUserId: string, toUserId: string): Promise<Like[]> {
    const existingLike = (await this.likeRepository.findOne({
      where: [
        { fromUserId, toUserId },
        { fromUserId: toUserId, toUserId: fromUserId },
      ],
    })) as Like;

    if (existingLike) {
      existingLike.isMatch = true;
      return await this.likeRepository.save([existingLike]);
    }

    const like = this.likeRepository.create({
      fromUserId,
      toUserId,
    });

    return await this.likeRepository.save([like]);
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
