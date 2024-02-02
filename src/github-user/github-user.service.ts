import { Injectable } from '@nestjs/common';
import { GithubUser } from './model/github.entity';
import { GithubDto } from './dtos/github.dto';
import { Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class GithubUserService {
  constructor(
    @InjectRepository(GithubUser)
    private githubUserRepository: Repository<GithubUser>,
  ) {}

  async getAll(): Promise<GithubUser[]> {
    const github_users = await this.githubUserRepository.find();
    return github_users;
  }

  async getById(id: string): Promise<GithubUser | null> {
    return await this.githubUserRepository.findOneBy({ id });
  }

  async create(user: GithubDto): Promise<GithubUser> {
    return await this.githubUserRepository.save(user);
  }

  async update(id: string, user: GithubDto): Promise<UpdateResult> {
    return await this.githubUserRepository.update(id, user);
  }

  async delete(id: string): Promise<void> {
    await this.githubUserRepository.delete(id);
  }

  async getByName(name: string): Promise<GithubUser | null> {
    return await this.githubUserRepository.findOneBy({ displayName: name });
  }

  async getByUsername(username: string): Promise<GithubUser | null> {
    return await this.githubUserRepository.findOneBy({ username });
  }
}
