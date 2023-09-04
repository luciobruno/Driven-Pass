import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteUserDTO {
  @IsNotEmpty()
  @IsString()
  password: string;
}
