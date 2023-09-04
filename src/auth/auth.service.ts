import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { User } from '@prisma/client';
import { CadastreDTO } from './dto/cadastre.dto';
import * as bcrypt from 'bcrypt';
import { LoginDTO } from './dto/login.dto';

@Injectable()
export class AuthService {
  private EXPIRATION = '1 day';

  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async cadastre(data: CadastreDTO) {
    return await this.userService.createUser(data);
  }

  async login(data: LoginDTO) {
    const email = data.email;
    const password = data.password;
    const user = await this.userService.findUserByEmail(email);
    if (!user) throw new UnauthorizedException();

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) throw new UnauthorizedException();

    return this.createToken(user);
  }

  createToken(data: User) {
    const id = data.id;
    const email = data.email;
    const token = this.jwtService.sign(
      { id, email },
      {
        expiresIn: this.EXPIRATION,
      },
    );
    return { token };
  }

  checkToken(token: string) {
    const data = this.jwtService.verify(token);
    return data;
  }
}
