import { Chats } from 'src/chats/model/chats.entity';
import { Data } from 'src/data/model/data.entity';
import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class GithubUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  displayName: string;

  @Column()
  username: string;

  @OneToOne(() => Data, { nullable: true })
  data: Data;

  @OneToMany(() => Chats, (chats) => chats.github_user)
  chats: Chats[];
}
