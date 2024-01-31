import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './model/user.entity';
import { Repository, UpdateResult } from 'typeorm';
import { UserDto } from './dtos/user.dto';
import { LoginDto } from 'src/auth/dtos/auth.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getAll(): Promise<User[]> {
    const users = await this.userRepository.find();
    return users;
  }

  async getById(id: string): Promise<User | null> {
    return await this.userRepository.findOneBy({ id });
  }

  async create(user: LoginDto): Promise<User> {
    return await this.userRepository.save(user);
  }

  async update(id: string, user: UserDto): Promise<UpdateResult> {
    return await this.userRepository.update(id, user);
  }

  async delete(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }

  async getByName(name: string): Promise<User | null> {
    return await this.userRepository.findOneBy({ name });
  }

  async getByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOneBy({ email });
  }
}
