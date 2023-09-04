import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class NoteDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Note',
    description: 'A name for your Note',
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Cheque',
    description: 'Text for save',
  })
  text: string;
}
