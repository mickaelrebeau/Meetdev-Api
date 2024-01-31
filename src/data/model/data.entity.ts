import { File } from 'src/avatar/model/avatar.entity';
import { User } from 'src/user/model/user.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column('text', { array: true, nullable: true })
  languages: string[];

  @Column('jsonb', { nullable: true })
  filters: Filters;

  @OneToOne(() => User, (user) => user.data, { nullable: true })
  user: User;

  @OneToOne(() => File, (avatar) => avatar.data, { nullable: true })
  avatar: File;
}
