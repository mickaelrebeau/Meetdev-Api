import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { unlinkSync } from 'fs';
import { Avatar } from './model/avatar.entity';

@Injectable()
export class AvatarService {
  constructor(
    @InjectRepository(Avatar)
    private readonly fileRepository: Repository<Avatar>,
  ) {}

  async uploadFile(file: Express.Multer.File): Promise<Avatar> {
    const newFile = await this.fileRepository.save(file);
    return newFile;
  }

  async getByUserId(userId: string) {
    return await this.fileRepository.find({ where: { user: { userId } } });
  }

  async delete(id: string) {
    const file = await this.fileRepository.findOneBy({ id });
    if (file) {
      unlinkSync(file.path);
    }
    return this.fileRepository.delete(id);
  }
}
