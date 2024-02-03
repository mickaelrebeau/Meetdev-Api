import { Data } from 'src/data/model/data.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class File {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  originalname: string;

  @Column()
  path: string;

  @Column()
  fieldname: string;

  @Column()
  encoding: string;

  @Column()
  mimetype: string;

  @Column()
  destination: string;

  @Column()
  filename: string;

  @Column()
  size: number;

  @OneToOne(() => Data, { eager: true, nullable: true })
  data: Data;
}
