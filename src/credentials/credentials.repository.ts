import { Injectable } from '@nestjs/common';
import { CredentialDTO } from './dto/credential.dto';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class CredentialsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createCredential(data: CredentialDTO, user: User) {
    return await this.prisma.credential.create({
      data: { ...data, userId: user.id },
    });
  }

  async findAllByUserId(userId: number) {
    return await this.prisma.credential.findMany({ where: { userId: userId } });
  }

  async findOneById(id: number) {
    return await this.prisma.credential.findFirst({ where: { id } });
  }
  async deleteById(id: number) {
    return await this.prisma.credential.delete({ where: { id } });
  }
  async findByName(name: string) {
    return await this.prisma.credential.findFirst({ where: { name } });
  }
}
