import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Faculty {
  @PrimaryGeneratedColumn()
  FacultyID: number;

  @Column()
  FacultyName: string;
}
