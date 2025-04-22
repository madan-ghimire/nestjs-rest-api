import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { UserService } from './user.service';
import { EditUserDto } from './dto';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

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
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List of users successfully retrieved',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Unauthorized access',
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
