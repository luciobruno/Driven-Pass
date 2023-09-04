import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDTO } from './dto/createUser.dto';

@Injectable()
export class UserRepository {
  private SALT = 10;
  constructor(private readonly prisma: PrismaService) {}

  async createUser(data: CreateUserDTO) {
    await this.prisma.user.create({
      data: {
        email: data.email,
        password: bcrypt.hashSync(data.password, this.SALT),
      },
    });
  }
  async findUserByEmail(email: string) {
    return await this.prisma.user.findFirst({ where: { email } });
  }
  async findUserById(id: number) {
    return await this.prisma.user.findFirst({ where: { id } });
  }
  async deleteUserById(id: number) {
    await this.prisma.note.deleteMany({ where: { id } });
    await this.prisma.card.deleteMany({ where: { id } });
    await this.prisma.credential.deleteMany({ where: { id } });
    return await this.prisma.user.delete({ where: { id } });
  }
}
