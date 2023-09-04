import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CredentialsRepository } from './credentials.repository';
import { CredentialDTO } from './dto/credential.dto';
import { User } from '@prisma/client';
import { CryptrService } from '../cryptr/cryptr.service';

@Injectable()
export class CredentialsService {
  constructor(
    private readonly credentialRepository: CredentialsRepository,
    private readonly cryptrService: CryptrService,
  ) {}

  async createCredential(data: CredentialDTO, user: User) {
    const isNotValidName = await this.credentialRepository.findByName(
      data.name,
    );
    if (isNotValidName) throw new ConflictException();
    const encrypted = this.cryptrService.encrypt(data.password);
    return await this.credentialRepository.createCredential(
      {
        ...data,
        password: encrypted,
      },
      user,
    );
  }
  async findAllByUserId(user: User) {
    const credentials = await this.credentialRepository.findAllByUserId(
      user.id,
    );
    const result = await Promise.all(
      credentials.map(async (e) => {
        const password = this.cryptrService.decrypt(e.password);
        return { ...e, password };
      }),
    );
    return result;
  }

  async findOneById(id: number, user: User) {
    const credential = await this.credentialRepository.findOneById(id);
    if (!credential) throw new NotFoundException();
    if (credential.userId !== user.id) throw new ForbiddenException();
    return {
      ...credential,
      password: this.cryptrService.decrypt(credential.password),
    };
  }
  async deleteById(id: number, user: User) {
    const credential = await this.credentialRepository.findOneById(id);
    if (!credential) throw new NotFoundException();
    if (credential.userId !== user.id) throw new ForbiddenException();
    return await this.credentialRepository.deleteById(id);
  }
}
