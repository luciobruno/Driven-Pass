import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { DeleteUserDTO } from './dto/deleteUser.dto';
import { User } from '../decorators/user.decorator';
import { UserService } from './user.service';
import { AuthGuard } from '../guards/auth.guard';

@Controller('user')
@UseGuards(AuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/erase')
  @HttpCode(200)
  async deleteUserById(@Body() body: DeleteUserDTO, @User() user) {
    return this.userService.deleteUserById(body, user);
  }
}
