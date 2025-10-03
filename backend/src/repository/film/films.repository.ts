import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { FilmDto } from '../../films/dto/films.dto';
import { Film, FilmDocument } from '../../films/models/films.schema';
import { InjectModel } from '@nestjs/mongoose';

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
export class FilmsRepository implements IFilmsRepository {
  constructor(
    @InjectModel(Film.name) private readonly filmModel: Model<FilmDocument>,
  ) {}

  async findAll(): Promise<FilmDto[]> {
    return this.filmModel.find({}).exec();
  }

  async findFilmSchedule(filmId: string): Promise<FilmDto | null> {
    return this.filmModel.findOne({ id: filmId }).exec();
  }

  async updateSessionTakenSeats(
    filmId: string,
    sessionId: string,
    takenSeats: string[],
  ): Promise<void> {
    await this.filmModel
      .updateOne(
        {
          id: filmId,
          'schedule.id': sessionId,
        },
        {
          $set: {
            'schedule.$.taken': takenSeats,
          },
        },
      )
      .exec();
  }
}
