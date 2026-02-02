import { Injectable } from '@nestjs/common';
import { CreateFacultyDto } from './dto/create-faculty.dto';
import { UpdateFacultyDto } from './dto/update-faculty.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Faculty } from './entities/faculty.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FacultiesService {
  constructor(
    @InjectRepository(Faculty)
    private readonly facultyRepo: Repository<Faculty>,
  ) {}

  create(createFacultyDto: CreateFacultyDto) {
    return this.facultyRepo.save(createFacultyDto);
  }

  findAll() {
    return this.facultyRepo.find();
  }

  findOne(id: number) {
    return this.facultyRepo.findOneBy({ FacultyID: id });
  }

  update(id: number, updateFacultyDto: UpdateFacultyDto) {
    return this.facultyRepo.update(id, updateFacultyDto);
  }

  remove(id: number) {
    return this.facultyRepo.delete(id);
  }
}
