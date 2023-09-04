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
import { CredentialsService } from './credentials.service';
import { AuthGuard } from '../guards/auth.guard';
import { CredentialDTO } from './dto/credential.dto';
import { User } from '../decorators/user.decorator';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Credentials')
@Controller('credentials')
@UseGuards(AuthGuard)
export class CredentialsController {
  constructor(private readonly credentialService: CredentialsService) {}

  @ApiOperation({ summary: 'Create a credential' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Credential created',
  })
  @ApiBody({ type: CredentialDTO })
  @Post()
  async createCredential(@Body() body: CredentialDTO, @User() user) {
    return await this.credentialService.createCredential(body, user);
  }

  @ApiOperation({ summary: 'Get all your credentials' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Got all your credentials',
  })
  @ApiBody({ type: CredentialDTO })
  @Get()
  async findAllCredentials(@User() user) {
    return await this.credentialService.findAllByUserId(user);
  }
  @ApiOperation({ summary: 'Get a specific credential' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Got your credential',
  })
  @ApiParam({ name: 'id', type: 'number', description: "Your credential's id" })
  @Get('/:id')
  async findOneByUserId(@Param('id') id: string, @User() user) {
    return await this.credentialService.findOneById(Number(id), user);
  }
  @ApiOperation({ summary: 'Delete a card' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Your card was deleted',
  })
  @ApiParam({ name: 'id', type: 'number', description: "Your credential's id" })
  @Delete('/:id')
  async deleteById(@Param('id') id: string, @User() user) {
    return await this.credentialService.deleteById(Number(id), user);
  }
}
