import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from './movie.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private movieRepository: Repository<Movie>,
  ) {}

  async create(
    createMovieDto: CreateMovieDto,
    posterPath?: string,
  ): Promise<Movie> {
    const movie = this.movieRepository.create({
      ...createMovieDto,
      poster: posterPath,
    });
    return this.movieRepository.save(movie);
  }

  async findAll(
    page: number = 1,
    limit: number = 10,
  ): Promise<{ data: Movie[]; total: number; page: number; limit: number }> {
    const [data, total] = await this.movieRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' },
    });

    return {
      data,
      total,
      page,
      limit,
    };
  }

  async findOne(id: string): Promise<Movie> {
    const movie = await this.movieRepository.findOne({ where: { id } });
    if (!movie) {
      throw new NotFoundException(`Movie with ID ${id} not found`);
    }
    return movie;
  }

  async update(
    id: string,
    updateMovieDto: UpdateMovieDto,
    posterPath?: string,
  ): Promise<Movie> {
    // Verify movie exists
    await this.findOne(id);

    // If posterPath is provided, update it; otherwise keep existing
    const updateData = {
      ...updateMovieDto,
      ...(posterPath !== undefined && { poster: posterPath }),
    };

    await this.movieRepository.update(id, updateData);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const movie = await this.findOne(id);
    await this.movieRepository.remove(movie);
  }
}
