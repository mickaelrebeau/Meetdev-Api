import { Data } from 'src/data/model/data.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class GoogleUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  displayName: string;

  @Column()
  email: string;

  @OneToOne(() => Data, (data) => data.googleUser, { nullable: true })
  data: Data;
}
