Steps to add passport in NestJS

Step 01) Installing dependencies

npm install --save @nestjs/passport passport passport-local
npm install --save-dev @types/passport-local

npm install --save @nestjs/jwt passport-jwt
npm install --save-dev @types/passport-jwt

Step 02) create auth module and service

nest generate module auth
nest generate service auth  

Step 03) create a resource “users”

nest generate resource users

Step 04) create CRUD apis for users

Step 05) create a login method in service

checkLogin(username: string, password: string) {
    return this.userRepo.findOneBy({ username, password });
  }

Step 06) Export UserService from users.module.ts

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})

Step 07) Import UserService in auth.module.ts

@Module({
  providers: [AuthService],
  imports: [UsersModule],
})


Step 08) Create a file named local.strategy.ts in auth folder

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Strategy } from 'passport-local';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string) {
    const data = await this.authService.validateUser(username, password);
    if (data) {
      return {
        error: false,
        token: data,
      };
    } else {
      throw new UnauthorizedException();
    }
  }
}


Step 09) add LocalStrategy to providers array in auth.module.ts
@Module({
  imports: [UsersModule],
  providers: [AuthService, LocalStrategy],
  exports: [AuthService],
})


 
