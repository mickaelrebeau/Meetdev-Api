import { File } from 'src/avatar/model/avatar.entity';
import { GithubUser } from 'src/github-user/model/github.entity';
import { GoogleUser } from 'src/google-user/model/google.entity';
import { User } from 'src/user/model/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Data {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  bio: string;

  @Column({ nullable: true })
  country: string;

  @Column({ nullable: true })
  post: string;

  @Column({ nullable: true })
  company: string;

  @Column({ nullable: true })
  github_url: string;

  @Column({ nullable: true })
  portfolio_url: string;

  @Column('simple-array', { array: true, nullable: true })
  languages: string[];

  @Column('jsonb', { nullable: true })
  filters: Filters;

  @OneToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToOne(() => GoogleUser, {
    nullable: true,
  })
  @JoinColumn({ name: 'google_user_id' })
  google_user: GoogleUser;

  @OneToOne(() => GithubUser, {
    nullable: true,
  })
  @JoinColumn({ name: 'github_user_id' })
  github_user: GithubUser;

  @OneToOne(() => File, { nullable: true })
  @JoinColumn({ name: 'avatar_id' })
  avatar: File;
}
