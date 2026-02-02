import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  BookID: number;

  @Column()
  BookTitle: string;

  @Column()
  BookPrice: number;
}
