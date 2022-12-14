import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger/dist/decorators';
import { User } from 'src/entities/user';
import { JwtGuard } from 'src/guards/jwt.guard';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('user')
@UseGuards(JwtGuard)
export class UserController {

    constructor(
        private readonly service: UserService
    ) { }

    @Get()
    public async listUsers(@Query() filters?: User): Promise<User[]> {
        return await this.service.listUsers(filters)
    }

    @Get(':id')
    public async getUserById(@Param('id') userId: number): Promise<User> {
        return await this.service.getUserById(userId)
    }

    @Post()
    public async createUser(@Body() user: User): Promise<User> {
        return await this.service.createUser(user)
    }

    @Put(':id')
    public async updateUser(@Param('id') userId: number, @Body() user: User): Promise<User> {
        return await this.service.updateUser(userId, user)
    }

    @Delete(':id')
    public async deleteUser(@Param('id') userId: number): Promise<void> {
        await this.service.deleteUser(userId)
    }
}
