import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CredentialDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Credential',
    description: 'A name for your credential',
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsUrl()
  @ApiProperty({
    example: 'facebook.com.br',
    description: 'A url for save',
  })
  url: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'S3cure@T3ste',
    description: 'Password for you credential',
  })
  password: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'facebook',
    description: 'A name for your url',
  })
  username: string;
}
