import { Message } from 'src/message/model/message.entity';
import { User } from 'src/user/model/user.entity';
import {
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Chat {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => Message, (message) => message.chat)
  messages: Message[];

  @ManyToMany(() => User, (user) => user.chats)
  @JoinTable({ name: 'chats_users' })
  users: User[];

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;
}
