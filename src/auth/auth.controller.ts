import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';
import { CadastreDTO } from './dto/cadastre.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDTO } from '../user/dto/createUser.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @ApiOperation({ summary: 'Login' })
  @ApiResponse({ status: HttpStatus.OK, description: 'User logged' })
  @ApiBody({ type: LoginDTO })
  @Post('/login')
  @HttpCode(200)
  async login(@Body() body: LoginDTO) {
    return await this.authService.login(body);
  }
  @ApiOperation({ summary: 'Create a user' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'User created' })
  @ApiBody({ type: CreateUserDTO })
  @Post('/cadastre')
  async cadastre(@Body() body: CadastreDTO) {
    return await this.authService.cadastre(body);
  }
}
