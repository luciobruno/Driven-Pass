import { Injectable } from '@nestjs/common';
import { NoteDTO } from './dto/note.dto';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class NotesRepository {
  constructor(private readonly prisma: PrismaService) {}
  async createNote(data: NoteDTO, user: User) {
    return await this.prisma.note.create({
      data: { ...data, userId: user.id },
    });
  }

  async findAllByUserId(userId: number) {
    return await this.prisma.note.findMany({ where: { userId: userId } });
  }

  async findOneById(id: number) {
    return await this.prisma.note.findFirst({ where: { id } });
  }
  async deleteById(id: number) {
    return await this.prisma.note.delete({ where: { id } });
  }
  async findByName(name: string) {
    return await this.prisma.note.findFirst({ where: { name } });
  }
}
