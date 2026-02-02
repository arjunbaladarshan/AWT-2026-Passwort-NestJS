import { Injectable } from '@nestjs/common';

@Injectable()
export class StudentsService {
  getAllStudents() {
    return 'this is a service return of students';
  }
}
