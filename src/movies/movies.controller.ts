import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  ParseIntPipe,
  DefaultValuePipe,
  Req,
} from '@nestjs/common';
import type { Request } from 'express';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('movies')
@Controller('movies')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new movie' })
  @ApiResponse({
    status: 201,
    description: 'Movie successfully created',
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async create(@Body() createMovieDto: CreateMovieDto, @Req() req: Request) {
    const userId = (req as any).user.userId;
    return this.moviesService.create(createMovieDto, userId, createMovieDto.poster);
  }

  @Get()
  @ApiOperation({ summary: 'Get all movies with pagination' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiResponse({
    status: 200,
    description: 'Movies retrieved successfully',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Req() req: Request,
  ) {
    const userId = (req as any).user.userId;
    return this.moviesService.findAll(userId, page, limit);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a movie by ID' })
  @ApiParam({ name: 'id', description: 'Movie ID' })
  @ApiResponse({
    status: 200,
    description: 'Movie retrieved successfully',
  })
  @ApiResponse({ status: 404, description: 'Movie not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async findOne(@Param('id') id: string, @Req() req: Request) {
    const userId = (req as any).user.userId;
    return this.moviesService.findOne(id, userId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a movie' })
  @ApiParam({ name: 'id', description: 'Movie ID' })
  @ApiResponse({
    status: 200,
    description: 'Movie updated successfully',
  })
  @ApiResponse({ status: 404, description: 'Movie not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async update(
    @Param('id') id: string,
    @Body() updateMovieDto: UpdateMovieDto,
    @Req() req: Request,
  ) {
    const userId = (req as any).user.userId;
    return this.moviesService.update(id, userId, updateMovieDto, updateMovieDto.poster);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a movie' })
  @ApiParam({ name: 'id', description: 'Movie ID' })
  @ApiResponse({
    status: 200,
    description: 'Movie deleted successfully',
  })
  @ApiResponse({ status: 404, description: 'Movie not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async remove(@Param('id') id: string, @Req() req: Request) {
    const userId = (req as any).user.userId;
    await this.moviesService.remove(id, userId);
    return { message: 'Movie deleted successfully' };
  }
}
