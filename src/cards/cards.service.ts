import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CryptrService } from '../cryptr/cryptr.service';
import { CardDTO } from './dto/card.dto';
import { User } from '@prisma/client';
import { CardsRepository } from './cards.repository';

@Injectable()
export class CardsService {
  constructor(
    private readonly cardRepository: CardsRepository,
    private readonly cryptrService: CryptrService,
  ) {}

  async createCredential(data: CardDTO, user: User) {
    const isNotValidName = await this.cardRepository.findByName(data.name);
    if (isNotValidName) throw new ConflictException();
    const encrypted = this.cryptrService.encrypt(data.password);
    return await this.cardRepository.createCard(
      {
        ...data,
        password: encrypted,
      },
      user,
    );
  }
  async findAllByUserId(user: User) {
    const cards = await this.cardRepository.findAllByUserId(user.id);
    const result = await Promise.all(
      cards.map(async (e) => {
        const password = this.cryptrService.decrypt(e.password);
        return { ...e, password };
      }),
    );
    return result;
  }

  async findOneById(id: number, user: User) {
    const card = await this.cardRepository.findOneById(id);
    if (!card) throw new NotFoundException();
    if (card.userId !== user.id) throw new ForbiddenException();
    return {
      ...card,
      password: this.cryptrService.decrypt(card.password),
    };
  }
  async deleteById(id: number, user: User) {
    const card = await this.cardRepository.findOneById(id);
    if (!card) throw new NotFoundException();
    if (card.userId !== user.id) throw new ForbiddenException();
    return await this.cardRepository.deleteById(id);
  }
}
