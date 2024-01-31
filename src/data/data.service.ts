import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Data } from './model/data.entity';
import { Repository, UpdateResult } from 'typeorm';
import { AvatarService } from 'src/avatar/avatar.service';

@Injectable()
export class DataService {
  constructor(
    @InjectRepository(Data)
    private dataRepository: Repository<Data>,
    private fileService: AvatarService,
  ) {}

  async getById(id: string): Promise<Data | null> {
    const data = await this.dataRepository.findOneBy({ id });
    const file = await this.fileService.getByDataId(data.id);

    data.avatar = file;
    return data;
  }

  async create(data: Data): Promise<Data> {
    return await this.dataRepository.save(data);
  }

  async update(
    id: string,
    data: Data,
    newFile: Express.Multer.File,
  ): Promise<UpdateResult> {
    const existingData = await this.getById(id);

    const updatedData = {
      bio: data.bio,
      country: data.country,
      post: data.post,
      company: data.company,
      github_url: data.github_url,
      portfolio_url: data.portfolio_url,
      languages: data.languages,
      filters: data.filters,
      user: data.user,
      avatar: data.avatar,
    };

    const dataUpdateResult = await this.dataRepository.update(id, updatedData);

    const uploadedFile = await this.fileService.addFileToData(id, newFile);

    existingData.avatar = uploadedFile;

    await this.dataRepository.save(existingData);

    return dataUpdateResult;
  }

  async destroyFiles(id: string): Promise<void> {
    const note = await this.getById(id);

    const file = await this.fileService.getByDataId(note.id);

    await this.fileService.delete(file.id);
  }
}
