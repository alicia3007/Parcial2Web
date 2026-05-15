import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TravelPlan {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column()
  startDate!: string;

  @Column()
  endDate!: string;

  @Column()
  countryCode!: string;

  @Column()
  userId!: number;

  @Column({ default: '[]' })
  expenses!: string;
}
