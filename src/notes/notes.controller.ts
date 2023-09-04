import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guard';
import { NotesService } from './notes.service';
import { User } from '../decorators/user.decorator';
import { NoteDTO } from './dto/note.dto';

@Controller('notes')
@UseGuards(AuthGuard)
export class NotesController {
  constructor(private readonly noteService: NotesService) {}

  @Post()
  async createNote(@Body() body: NoteDTO, @User() user) {
    return await this.noteService.createNote(body, user);
  }

  @Get()
  async findAllNotes(@User() user) {
    return await this.noteService.findAllByUserId(user);
  }
  @Get('/:id')
  async findOneByUserId(@Param('id') id: string, @User() user) {
    return await this.noteService.findOneById(Number(id), user);
  }
  @Delete('/:id')
  async deleteById(@Param('id') id: string, @User() user) {
    return await this.noteService.deleteById(Number(id), user);
  }
}
