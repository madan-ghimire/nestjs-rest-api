import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
// import { GetUser } from 'src/auth/decorator';
// import { JwtGuard } from 'src/auth/guard';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';

import { UserService } from './user.service';
import { EditUserDto } from './dto';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@UseGuards(JwtGuard)
@ApiBearerAuth()
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('me')
  getMe(@GetUser() user: User) {
    return user;
  }

  @ApiOperation({
    summary: 'Get all users',
    description: 'Retrieves a list of all registered users',
  })
  @Get('getAll')
  getAllUsers() {
    return this.userService.getUsers();
  }

  @Patch()
  editUser(@GetUser('id') userId: string, @Body() dto: EditUserDto) {
    return this.userService.editUser(userId, dto);
  }
}
