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
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToOne(() => Data, { nullable: true })
  data: Data;

  @OneToMany(() => Chats, (chats) => chats.user)
  chats: Chats[];
}
