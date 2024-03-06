import { Chat } from 'src/chat/model/chat.entity';
import { User } from 'src/user/model/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Message {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Chat)
  chat: Chat;

  @ManyToOne(() => User)
  user: User;

  @Column()
  content: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;
}
