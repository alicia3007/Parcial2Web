import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Country {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  alphaCode!: string;

  @Column()
  name!: string;

  @Column()
  region!: string;

  @Column()
  capital!: string;

  @Column()
  population!: number;

  @Column()
  flagUrl!: string;
}
