import { Module } from '@nestjs/common';
import { NotesController } from './notes.controller';
import { NotesService } from './notes.service';
import { NotesRepository } from './notes.repository';
import { CryptrService } from '../cryptr/cryptr.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [NotesController],
  providers: [NotesService, NotesRepository, CryptrService],
})
export class NotesModule {}
