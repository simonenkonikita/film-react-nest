import { Controller, Get, Param } from '@nestjs/common';
import { FilmsService } from './films.service';
import { FilmDto, ScheduleDto } from './dto/films.dto';

@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Get()
  async findAllFilms(): Promise<{ total: number; items: FilmDto[] }> {
    const films = await this.filmsService.findAllFilms();
    return {
      total: films.length,
      items: films,
    };
  }

  @Get(':id/schedule')
  async findFilmSchedule(
    @Param('id') id: string,
  ): Promise<{ total: number; items: ScheduleDto[] }> {
    const film = await this.filmsService.findFilmSchedule(id);
    return {
      total: film.schedule.length,
      items: film.schedule,
    };
  }
}
