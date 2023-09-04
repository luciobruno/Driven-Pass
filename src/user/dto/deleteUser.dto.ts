import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteUserDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'T3ste@0K',
    description: 'Your password for delete',
  })
  password: string;
}
