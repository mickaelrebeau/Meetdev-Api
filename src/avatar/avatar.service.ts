import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { unlinkSync } from 'fs';
import { File } from './model/avatar.entity';

@Injectable()
export class AvatarService {
  constructor(
    @InjectRepository(File)
    private readonly fileRepository: Repository<File>,
  ) {}

  async addFileToData(
    dataId: string,
    file: Express.Multer.File,
  ): Promise<File> {
    return await this.uploadFile(file);
  }

  async uploadFile(file: Express.Multer.File): Promise<File> {
    const newFile = await this.fileRepository.save(file);
    return newFile;
  }

  async getByDataId(id: string) {
    return await this.fileRepository.findOne({ where: { data: { id } } });
  }

  async delete(id: string) {
    const file = await this.fileRepository.findOneBy({ id });
    if (file) {
      unlinkSync(file.path);
    }
    return this.fileRepository.delete(id);
  }
}
