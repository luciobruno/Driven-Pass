import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guard';
import { CardsService } from './cards.service';
import { CardDTO } from './dto/card.dto';
import { User } from '../decorators/user.decorator';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Cards')
@Controller('cards')
@UseGuards(AuthGuard)
export class CardsController {
  constructor(private readonly cardService: CardsService) {}

  @ApiOperation({ summary: 'Create a card' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Card created' })
  @ApiBody({ type: CardDTO })
  @Post()
  async createCard(@Body() body: CardDTO, @User() user) {
    return await this.cardService.createCredential(body, user);
  }

  @ApiOperation({ summary: 'Get all your cards' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Got all your cards' })
  @Get()
  async findAllCards(@User() user) {
    return await this.cardService.findAllByUserId(user);
  }
  @ApiOperation({ summary: 'Get a specific card' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Got your card' })
  @ApiParam({ name: 'id', type: 'number', description: "Your card's id" })
  @Get('/:id')
  async findOneByUserId(@Param('id') id: string, @User() user) {
    return await this.cardService.findOneById(Number(id), user);
  }
  @ApiOperation({ summary: 'Delete a card' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Your card was deleted' })
  @ApiParam({ name: 'id', type: 'number', description: "Your card's id" })
  @Delete('/:id')
  async deleteById(@Param('id') id: string, @User() user) {
    return await this.cardService.deleteById(Number(id), user);
  }
}
