import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { Schedules } from './schedule.entity';

@Entity()
export class Films {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  director: string;

  @Column({ type: 'decimal', precision: 3, scale: 1 })
  rating: number;

  @Column('simple-array')
  tags: string[];

  @Column()
  image: string;

  @Column()
  cover: string;

  @Column('text')
  about: string;

  @Column('text')
  description: string;

  @OneToMany(() => Schedules, (schedule) => schedule.film)
  schedule: Schedules[];
}
