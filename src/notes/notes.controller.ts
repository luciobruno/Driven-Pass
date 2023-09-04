import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guard';
import { NotesService } from './notes.service';
import { User } from '../decorators/user.decorator';
import { NoteDTO } from './dto/note.dto';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Notes')
@Controller('notes')
@UseGuards(AuthGuard)
export class NotesController {
  constructor(private readonly noteService: NotesService) {}

  @ApiOperation({ summary: 'Create a Note' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Note created',
  })
  @ApiBody({ type: NoteDTO })
  @Post()
  async createNote(@Body() body: NoteDTO, @User() user) {
    return await this.noteService.createNote(body, user);
  }
  @ApiOperation({ summary: 'Get all your notes' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Got all your notes',
  })
  @Get()
  async findAllNotes(@User() user) {
    return await this.noteService.findAllByUserId(user);
  }
  @ApiOperation({ summary: 'Get a specific note' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Got your credential',
  })
  @ApiParam({ name: 'id', type: 'number', description: "Your note's id" })
  @Get('/:id')
  async findOneByUserId(@Param('id') id: string, @User() user) {
    return await this.noteService.findOneById(Number(id), user);
  }
  @ApiOperation({ summary: 'Delete a note' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Your note was deleted',
  })
  @ApiParam({ name: 'id', type: 'number', description: "Your note's id" })
  @Delete('/:id')
  async deleteById(@Param('id') id: string, @User() user) {
    return await this.noteService.deleteById(Number(id), user);
  }
}
