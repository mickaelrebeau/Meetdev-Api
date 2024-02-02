import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { GoogleUser } from '../google-user/model/google.entity';
import { GoogleDto } from 'src/google-user/dtos/google.dto';

@Injectable()
export class GoogleUserService {
  constructor(
    @InjectRepository(GoogleUser)
    private googleUserRepository: Repository<GoogleUser>,
  ) {}

  async getAll(): Promise<GoogleUser[]> {
    const google_users = await this.googleUserRepository.find();
    return google_users;
  }

  async getById(id: string): Promise<GoogleUser | null> {
    return await this.googleUserRepository.findOneBy({ id });
  }

  async create(user: GoogleDto): Promise<GoogleUser> {
    return await this.googleUserRepository.save(user);
  }

  async update(id: string, user: GoogleDto): Promise<UpdateResult> {
    return await this.googleUserRepository.update(id, user);
  }

  async delete(id: string): Promise<void> {
    await this.googleUserRepository.delete(id);
  }

  async getByName(name: string): Promise<GoogleUser | null> {
    return await this.googleUserRepository.findOneBy({ displayName: name });
  }

  async getByEmail(email: string): Promise<GoogleUser | null> {
    return await this.googleUserRepository.findOneBy({ email });
  }
}
