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


Step 10) add login method in auth.service.ts

Step 11) inject JwtService in auth.service.ts

Step 12) sign data in login method in auth.service.ts
	async login(user: any) {
    const token = this.jwtService.sign({
      id: user.token.id,
      username: user.token.username,
    });

    return {
      error: false,
      token,
    };
  }


Step 13) Import JwtModule in auth.module.ts
	imports: [
    UsersModule,
    JwtModule.register({
      secret: 'very secret key', // do not specify secret key here, instead put it in .env
      signOptions: { expiresIn: '60s' },
    }),
  ],

Step 14) create a new file in auth folder named jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      secretOrKey: 'very secret key',
      ignoreExpiration: false,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }
  async validate(payload: any) {
    return { id: payload.id, username: payload.username };
  }
}


Step 15) add JwtStrategy in providers array in auth.module.ts

 providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
]

Step 16) use @UseGuard decorator where we want to have token checked
@UseGuards(AuthGuard('jwt'))
  @Get()
  findAll() {
    return this.booksService.findAll();
  }















 
