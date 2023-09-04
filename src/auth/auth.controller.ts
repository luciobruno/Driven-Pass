import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';
import { CadastreDTO } from './dto/cadastre.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('/login')
  async login(@Body() body: LoginDTO) {
    return await this.authService.login(body);
  }
  @Post('/cadastre')
  async cadastre(@Body() body: CadastreDTO) {
    return await this.authService.cadastre(body);
  }
}
