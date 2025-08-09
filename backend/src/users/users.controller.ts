import { Controller, Get, Put, Body, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('profile')
  async getProfile(@Request() req) {
    const user = await this.usersService.findById(req.user.id);
    return user;
  }

  @Put('profile')
  async updateProfile(@Request() req, @Body() updateUserDto: { name?: string; phone?: string }) {
    const user = await this.usersService.update(req.user.id, updateUserDto);
    return user;
  }
} 