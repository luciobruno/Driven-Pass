import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CredentialDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsUrl()
  url: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  username: string;
}
