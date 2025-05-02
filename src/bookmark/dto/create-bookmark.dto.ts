import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateBookmarkDto {
  @ApiProperty({
    description: 'The title of the bookmark',
    example: 'NestJS Documentation',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiPropertyOptional({
    description: 'A short description of the bookmark',
    example: 'Comprehensive guide to building server-side apps with NestJS',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'The URL of the bookmarked resource',
    example: 'https://docs.nestjs.com',
  })
  @IsString()
  @IsNotEmpty()
  link: string;
}
