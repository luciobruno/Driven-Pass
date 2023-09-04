import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
} from 'class-validator';

export class CardDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'Credit Card',
    description: 'A name for your card',
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  @Length(16, 16)
  @Matches(/^[0-9]+$/)
  @ApiProperty({
    example: '1234567891234567',
    description: 'Your card numbers',
  })
  cardNumbers: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'lucio printes',
    description: 'Your name on card',
  })
  cardOwner: string;

  @IsString()
  @IsNotEmpty()
  @Length(3, 3)
  @ApiProperty({
    example: '123',
    description: 'Your card security code',
  })
  cvv: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^(0[1-9]|1[0-2])\/(20\d{2}|21\d{2})$/)
  @ApiProperty({
    example: '11/2030',
    description: 'Expiration date of your card',
  })
  expirationDate: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'S3nh4Segura@',
    description: 'A password for your card',
  })
  password: string;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({
    example: true,
    type: Boolean,
    description: 'If your card is digital or physical',
  })
  isVirtual: boolean;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Credit',
    description: 'What type of card do you have',
  })
  cardType: string;
}
