import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guard';
import { CardsService } from './cards.service';
import { CardDTO } from './dto/card.dto';
import { User } from '../decorators/user.decorator';

@Controller('cards')
@UseGuards(AuthGuard)
export class CardsController {
  constructor(private readonly cardService: CardsService) {}

  @Post()
  async createCard(@Body() body: CardDTO, @User() user) {
    return await this.cardService.createCredential(body, user);
  }

  @Get()
  async findAllCards(@User() user) {
    return await this.cardService.findAllByUserId(user);
  }
  @Get('/:id')
  async findOneByUserId(@Param('id') id: string, @User() user) {
    return await this.cardService.findOneById(Number(id), user);
  }
  @Delete('/:id')
  async deleteById(@Param('id') id: string, @User() user) {
    return await this.cardService.deleteById(Number(id), user);
  }
}
