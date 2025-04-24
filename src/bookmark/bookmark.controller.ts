import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
// import { JwtGuard } from 'src/auth/guard';
import { JwtGuard } from '../auth/guard';
import { BookmarkService } from './bookmark.service';
// import { GetUser } from 'src/auth/decorator';
import { GetUser } from '../auth/decorator';
import { CreateBookmarkDto, EditBookmarkDto } from './dto';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@UseGuards(JwtGuard)
@ApiBearerAuth()
@Controller('bookmarks')
export class BookmarkController {
  constructor(private bookmarkService: BookmarkService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all bookmarks',
    description: 'Returns all bookmarks for the authenticated user',
  })
  getBookmarks(@GetUser('id') userId: string) {
    return this.bookmarkService.getBookmarks(userId);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get bookmark by ID',
    description:
      'Returns a specific bookmark by its ID for the authenticated user',
  })
  getBookmarkById(
    @GetUser('id') userId: string,
    @Param('id') bookmarkId: string,
  ) {
    return this.bookmarkService.getBookmarkById(userId, bookmarkId);
  }

  @Post()
  @ApiOperation({
    summary: 'Create a bookmark',
    description: 'Creates a new bookmark for the authenticated user',
  })
  createBookmark(
    @GetUser('id') userId: string,
    @Body() dto: CreateBookmarkDto,
  ) {
    return this.bookmarkService.createBookmark(userId, dto);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Edit bookmark by ID',
    description:
      'Edits an existing bookmark identified by its ID for the authenticated user',
  })
  editBookmarkById(
    @GetUser('id') userId: string,
    @Param('id') bookmarkId: string,
    @Body() dto: EditBookmarkDto,
  ) {
    return this.bookmarkService.editBookmarkById(userId, bookmarkId, dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  @ApiOperation({
    summary: 'Delete bookmark by ID',
    description:
      'Deletes a specific bookmark by its ID for the authenticated user',
  })
  deleteBookmarkById(
    @GetUser('id') userId: string,
    @Param('id') bookmarkId: string,
  ) {
    return this.bookmarkService.deleteBookmarkById(userId, bookmarkId);
  }
}
