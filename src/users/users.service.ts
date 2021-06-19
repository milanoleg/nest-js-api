import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private users: User[] = [];

  async create(createUserDto: CreateUserDto) {
    await new Promise((res) => {
      setTimeout(res, 2000);
    });

    const { username, password } = createUserDto;
    const user = new User(uuid(), username, password);

    this.users.push(user);

    return user;
  }

  findAll() {
    return this.users;
  }

  findOne(id: string) {
    const user = this.users.find((user: User) => user.id === id);

    if (!user) {
      throw new NotFoundException(`User with ${id} doesn't exist`);
    }

    return user;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    const user = this.findOne(id);

    if (!user) {
      throw new NotFoundException(`User with ${id} doesn't exist`);
    }

    const { username, password } = updateUserDto;

    user.username = username ?? user.username;
    user.password = password ?? user.password;

    this.users.map((u) => {
      if (u.id === id) {
        return user;
      }

      return u;
    });

    return user;
  }

  remove(id: string) {
    const user = this.findOne(id);

    if (!user) {
      throw new NotFoundException(`User with ${id} doesn't exist`);
    }

    this.users.filter((u) => u.id !== id);

    return user;
  }
}
