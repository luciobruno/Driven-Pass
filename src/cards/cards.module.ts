import { Module } from '@nestjs/common';
import { CardsController } from './cards.controller';
import { CardsService } from './cards.service';
import { CardsRepository } from './cards.repository';
import { CryptrService } from '../cryptr/cryptr.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [CardsController],
  providers: [CardsService, CardsRepository, CryptrService],
})
export class CardsModule {}
