import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './model/user.entity';
import { Repository, UpdateResult } from 'typeorm';
import { UserDto } from './dtos/user.dto';

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

  async create(user: UserDto): Promise<User> {
    return await this.userRepository.save(user);
  }

  async update(id: string, user: UserDto): Promise<UpdateResult> {
    return await this.userRepository.update(id, user);
  }

  async delete(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }

  async getByName(name: string): Promise<User | null> {
    return await this.userRepository.findOneBy({ displayName: name });
  }

  async getByUsername(username: string): Promise<User | null> {
    return await this.userRepository.findOneBy({ username });
  }

  async getByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOneBy({ email });
  }

  async getDisplayNamebyId(id: string): Promise<{ displayName: string }> {
    const user = await this.userRepository.findOneBy({ id });
    return { displayName: user.displayName };
  }
}
