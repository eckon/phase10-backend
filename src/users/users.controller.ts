import { Get, Controller, Param, Post, Body, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { ApiResponse } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    @ApiResponse({ status: 200, type: User, isArray: true })
    async getUsers(): Promise<User[]> {
      return await this.usersService.findAll();
    }

    @Get(':id')
    @ApiResponse({ status: 200, type: User })
    async getUserById(@Param() params: any): Promise<User> {
      const id = Number(params.id);
      return await this.usersService.findById(id);
    }

    @Post()
    @ApiResponse({ status: 201, type: Number, description: 'ID of the created User' })
    async insertUser(@Body() user: User): Promise<number> {
      const result = await this.usersService.insert(user);
      return result.identifiers[0].id;
    }

    @Delete(':id')
    @ApiResponse({ status: 200, type: User })
    async deleteUserById(@Param() params: any): Promise<User> {
      const id = Number(params.id);
      const result = await this.usersService.deleteById(id);
      // TODO: Exception when result is empty -> no user was found

      return result;
    }
}
