import {
  IsNotEmpty,
  IsString,
  IsInt,
  Min,
  Max,
  IsOptional,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateMovieDto {
  @ApiProperty({
    description: 'Movie title',
    example: 'The Shawshank Redemption',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'Publishing year of the movie',
    example: 1994,
    minimum: 1888, // First movie ever made
    maximum: new Date().getFullYear() + 1, // Allow next year for upcoming releases
  })
  @IsInt()
  @Min(1888)
  @Max(new Date().getFullYear() + 1)
  publishingYear: number;

  @ApiPropertyOptional({
    description:
      'Poster image URL (upload image separately to /upload endpoint)',
    example:
      'https://res.cloudinary.com/example/image/upload/v1234567890/posters/movie-poster.jpg',
  })
  @IsOptional()
  @IsString()
  poster?: string;
}
