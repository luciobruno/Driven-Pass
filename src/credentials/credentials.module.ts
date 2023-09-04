import { Module } from '@nestjs/common';
import { CredentialsController } from './credentials.controller';
import { CredentialsService } from './credentials.service';
import { CredentialsRepository } from './credentials.repository';
import { AuthModule } from '../auth/auth.module';
import { CryptrService } from '../cryptr/cryptr.service';

@Module({
  imports: [AuthModule],
  controllers: [CredentialsController],
  providers: [CredentialsService, CredentialsRepository, CryptrService],
})
export class CredentialsModule {}
