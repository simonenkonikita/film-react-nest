import { Injectable } from '@nestjs/common';
import { FilmDto } from '../films/dto/films.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Films } from '../entities/films.entity';
import { Schedules } from '../entities/schedule.entity';

export interface IFilmsRepository {
  findAll(): Promise<FilmDto[]>;
  findFilmSchedule(filmId: string): Promise<FilmDto | null>;
  updateSessionTakenSeats(
    filmId: string,
    sessionId: string,
    takenSeats: string[],
  ): Promise<void>;
}

@Injectable()
export class AppRepository implements IFilmsRepository {
  constructor(
    @InjectRepository(Films)
    private filmRepository: Repository<Films>,
    @InjectRepository(Schedules)
    private scheduleRepository: Repository<Schedules>,
  ) {}

  async findAll(): Promise<FilmDto[]> {
    return this.filmRepository.find({
      relations: ['schedule'],
    });
  }

  async findFilmSchedule(filmId: string): Promise<FilmDto | null> {
    return this.filmRepository.findOne({
      where: { id: filmId },
      relations: ['schedule'],
    });
  }

  async updateSessionTakenSeats(
    filmId: string,
    sessionId: string,
    takenSeats: string[],
  ): Promise<void> {
    await this.scheduleRepository.update(
      { id: sessionId },
      { taken: takenSeats },
    );
  }
}
