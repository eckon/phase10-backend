import { Get, Controller, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { ApiResponse } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    @ApiResponse({ status: 200, type: [User] })
    getUsers(): Promise<User[]> {
      return this.usersService.findAll();
    }

    @Get(':name')
    @ApiResponse({ status: 200, type: User })
    getUserByName(@Param() params: any): Promise<User[]> {
      return this.usersService.findByName(params.name);
    }
}
