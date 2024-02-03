import { GithubUser } from 'src/github-user/model/github.entity';
import { GoogleUser } from 'src/google-user/model/google.entity';
import { User } from 'src/user/model/user.entity';
import {
  Column,
  CreateDateColumn,
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

  @ManyToOne(() => User, { eager: true, nullable: true })
  @JoinColumn({ name: 'chats_user_id' })
  user: User;

  @ManyToOne(() => GoogleUser, { eager: true, nullable: true })
  @JoinColumn({ name: 'chats_google_user_id' })
  google_user: User;

  @ManyToOne(() => GithubUser, { eager: true, nullable: true })
  @JoinColumn({ name: 'chats_github_user_id' })
  github_user: User;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;
}
