import { IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class EditBookmarkDto {
  @ApiPropertyOptional({
    description: 'Updated title of the bookmark',
    example: 'Updated NestJS Docs',
  })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiPropertyOptional({
    description: 'Updated description of the bookmark',
    example: 'New guide on NestJS with advanced topics',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({
    description: 'Updated link to the bookmarked resource',
    example: 'https://updated.nestjs.com/docs',
  })
  @IsString()
  @IsOptional()
  link?: string;
}
