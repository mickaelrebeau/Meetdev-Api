import { User } from 'src/user/model/user.entity';
import {
  Column,
  CreateDateColumn,
  DeepPartial,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Chats {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  message: string;

  @ManyToOne(() => User, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_sender_id' })
  userSender: DeepPartial<User>;

  @ManyToOne(() => User, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_receiver_id' })
  userReceiver: DeepPartial<User>;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;
}
