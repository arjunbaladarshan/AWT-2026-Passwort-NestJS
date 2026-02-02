import { Controller, Get, HttpCode, Param } from '@nestjs/common';
import { StudentsService } from './students.service';

@Controller('students')
export class StudentsController {
  // DI
  constructor(private readonly studentService: StudentsService) {}

  @Get()
  getAll() {
    return this.studentService.getAllStudents();
  }

  @Get('/:id')
  getById(@Param('id') id: string) {
    return 'Get Student By ID = ' + id;
  }
}
