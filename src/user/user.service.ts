import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDTO } from './dto/createUser.dto';
import { DeleteUserDTO } from './dto/deleteUser.dto';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(data: CreateUserDTO) {
    const email = data.email;
    const user = await this.userRepository.findUserByEmail(email);
    if (user) throw new ConflictException();
    return await this.userRepository.createUser(data);
  }
  async findUserByEmail(email: string) {
    const user = await this.userRepository.findUserByEmail(email);
    if (!user) throw new NotFoundException();
    return user;
  }
  async findUserById(id: number) {
    return await this.userRepository.findUserById(id);
  }
  async deleteUserById(data: DeleteUserDTO, user: User) {
    const isValid = bcrypt.compareSync(data.password, user.password);
    if (!isValid) throw new UnauthorizedException();
    return await this.userRepository.deleteUserById(user.id);
  }
}
