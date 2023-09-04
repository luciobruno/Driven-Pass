import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { NotesRepository } from './notes.repository';
import { CryptrService } from '../cryptr/cryptr.service';
import { NoteDTO } from './dto/note.dto';
import { User } from '@prisma/client';

@Injectable()
export class NotesService {
  constructor(
    private readonly noteRepository: NotesRepository,
    private readonly cryptrService: CryptrService,
  ) {}

  async createNote(data: NoteDTO, user: User) {
    const note = await this.noteRepository.findByName(data.name);
    if (note) throw new NotFoundException();
    const encrypted = this.cryptrService.encrypt(data.text);
    return await this.noteRepository.createNote(
      { ...data, text: encrypted },
      user,
    );
  }

  async findAllByUserId(user: User) {
    const notes = await this.noteRepository.findAllByUserId(user.id);
    const result = await Promise.all(
      notes.map(async (e) => {
        const text = this.cryptrService.decrypt(e.text);
        return { ...e, text };
      }),
    );
    return result;
  }
  async findOneById(id: number, user: User) {
    const note = await this.noteRepository.findOneById(id);
    if (!note) throw new NotFoundException();
    if (note.userId !== user.id) throw new ForbiddenException();
    return {
      ...note,
      text: this.cryptrService.decrypt(note.text),
    };
  }

  async deleteById(id: number, user: User) {
    const note = await this.noteRepository.findOneById(id);
    if (!note) throw new NotFoundException();
    if (note.userId !== user.id) throw new ForbiddenException();
    return await this.noteRepository.deleteById(id);
  }
}
