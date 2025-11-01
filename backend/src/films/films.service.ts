import { Injectable, NotFoundException } from '@nestjs/common';
import { AppRepository } from '../repository/app.repository';
import { FilmDto } from './dto/films.dto';

@Injectable()
export class FilmsService {
  constructor(private readonly filmsRepository: AppRepository) {}

  async findAllFilms(): Promise<FilmDto[]> {
    const films = await this.filmsRepository.findAll();
    if (!films || films.length === 0) {
      throw new NotFoundException('Список фильмов пуст');
    }
    return films;
  }

  async findFilmSchedule(id: string): Promise<FilmDto> {
    const film = await this.filmsRepository.findFilmSchedule(id);
    if (!film) {
      throw new NotFoundException('Фильм не найден');
    }
    return film;
  }
}
