import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Image {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  uri: string;

  @Column()
  name: string;

  @Column()
  type: string;

  @Column()
  userId: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;
}
