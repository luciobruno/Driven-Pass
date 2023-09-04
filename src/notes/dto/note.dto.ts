import { IsNotEmpty, IsString } from 'class-validator';

export class NoteDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  text: string;
}
