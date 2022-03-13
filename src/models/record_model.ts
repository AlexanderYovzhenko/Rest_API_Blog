import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user_model';

@Entity()
export class Record {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'timestamptz' })
  date!: Date;

  @Column()
  message!: string;

  @Column()
  author!: string;

  @Column()
  fileName?: string;

  @ManyToOne(() => User, user => user.record)
  user: User;
}
