import { Data } from 'src/data/model/data.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class GithubUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  displayName: string;

  @Column()
  username: string;

  @OneToOne(() => Data, (data) => data.githubUser, { nullable: true })
  data: Data;
}
