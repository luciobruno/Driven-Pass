import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CredentialsService } from './credentials.service';
import { AuthGuard } from '../guards/auth.guard';
import { CredentialDTO } from './dto/credential.dto';
import { User } from '../decorators/user.decorator';

@Controller('credentials')
@UseGuards(AuthGuard)
export class CredentialsController {
  constructor(private readonly credentialService: CredentialsService) {}

  @Post()
  async createCredential(@Body() body: CredentialDTO, @User() user) {
    return await this.credentialService.createCredential(body, user);
  }

  @Get()
  async findAllCredentials(@User() user) {
    return await this.credentialService.findAllByUserId(user);
  }
  @Get('/:id')
  async findOneByUserId(@Param('id') id: string, @User() user) {
    return await this.credentialService.findOneById(Number(id), user);
  }
  @Delete('/:id')
  async deleteById(@Param('id') id: string, @User() user) {
    return await this.credentialService.deleteById(Number(id), user);
  }
}
