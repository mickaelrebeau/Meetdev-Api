import { Avatar } from 'src/avatar/model/avatar.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  bio: string;

  @Column()
  country: string;

  @Column()
  post: string;

  @Column()
  company: string;

  @Column()
  github_url: string;

  @Column()
  portfolio_url: string;

  @Column('text', { array: true })
  languages: string[];

  @Column('jsonb')
  filters: Filters;

  @OneToOne(() => Avatar, (avatar) => avatar.user)
  avatar: Avatar;
}
