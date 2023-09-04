import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CardDTO } from './dto/card.dto';
import { User } from '@prisma/client';

@Injectable()
export class CardsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createCard(data: CardDTO, user: User) {
    return await this.prisma.card.create({
      data: { ...data, userId: user.id },
    });
  }

  async findAllByUserId(userId: number) {
    return await this.prisma.card.findMany({ where: { userId: userId } });
  }

  async findOneById(id: number) {
    return await this.prisma.card.findFirst({ where: { id } });
  }
  async deleteById(id: number) {
    return await this.prisma.card.delete({ where: { id } });
  }
  async findByName(name: string) {
    return await this.prisma.card.findFirst({ where: { name } });
  }
}
