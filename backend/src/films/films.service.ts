import { Injectable, NotFoundException } from '@nestjs/common';
import { FilmsRepository } from '../repository/film/films.repository';
import { FilmDto } from './dto/films.dto';

@Injectable()
export class FilmsService {
  constructor(private readonly filmsRepository: FilmsRepository) {}

  async findAllFilms(): Promise<FilmDto[]> {
    const films = this.filmsRepository.findAll();
    if (!films) {
      throw new NotFoundException('Список фильмов пуст');
    }
    return films;
  }

  async findFilmSchedule(id: string): Promise<FilmDto> {
    const film = this.filmsRepository.findFilmSchedule(id);
    if (!film) {
      throw new NotFoundException('Фильм не найден');
    }
    return film;
  }
}
