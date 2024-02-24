import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Data } from './model/data.entity';
import { Repository, UpdateResult } from 'typeorm';
import { DataDto } from './dtos/data.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class DataService {
  constructor(
    @InjectRepository(Data)
    private dataRepository: Repository<Data>,
    private readonly userService: UserService,
  ) {}

  async getById(id: string): Promise<Data | null> {
    const user = await this.userService.getById(id);

    if (!user) {
      throw new Error('User not found');
    }

    const data = await this.dataRepository.findOneBy({ user });

    if (!data) {
      return null;
    }

    return data;
  }

  async create(id: string, data: DataDto): Promise<Data> {
    const user = await this.userService.getById(id);

    if (!user) {
      throw new Error('User not found');
    }

    const newData = {
      ...data,
      user,
    };

    return await this.dataRepository.save(newData);
  }

  async update(id: string, data: DataDto): Promise<UpdateResult> {
    const exsistingData = await this.dataRepository.findOneBy({ id });

    const updatedData = {
      bio: data.bio,
      country: data.country,
      post: data.post,
      company: data.company,
      github_url: data.github_url,
      portfolio_url: data.portfolio_url,
      languages: data.languages,
      filters: data.filters,
      user: exsistingData.user,
    };

    return await this.dataRepository.update(id, updatedData);
  }

  async delete(id: string): Promise<void> {
    const user = await this.userService.getById(id);

    if (!user) {
      throw new Error('User not found');
    }

    const data = await this.dataRepository.findOneBy({ user });

    await this.dataRepository.delete(data.id);
  }
}
