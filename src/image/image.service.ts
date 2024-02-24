import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { Image } from './model/image.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ImageDto } from './dtos/image.dto';

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>,
    private readonly userService: UserService,
  ) {}

  async getByUserId(id: string) {
    return await this.imageRepository.find({ where: { userId: id } });
  }

  async uploadFile(image: ImageDto, id: string) {
    const user = this.userService.getById(id);

    if (!user) {
      throw new Error('User not found');
    }

    const file = {
      uri: image.uri,
      name: image.name,
      type: image.type,
      userId: id,
    };

    return await this.imageRepository.save(file);
  }
}
