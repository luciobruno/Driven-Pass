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
  name: string;

  @IsString()
  @IsNotEmpty()
  @Length(16, 16)
  @Matches(/^[0-9]+$/)
  cardNumbers: string;

  @IsString()
  @IsNotEmpty()
  cardOwner: string;

  @IsString()
  @IsNotEmpty()
  @Length(3, 3)
  cvv: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^(0[1-9]|1[0-2])\/(20\d{2}|21\d{2})$/)
  expirationDate: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsBoolean()
  @IsNotEmpty()
  isVirtual: boolean;

  @IsString()
  @IsNotEmpty()
  cardType: string;
}
