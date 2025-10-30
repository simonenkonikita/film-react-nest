import { FilmsController } from './films.controller';
import { describe, beforeEach, afterEach, it, expect, jest } from '@jest/globals';
import { FilmsService } from './films.service';
import { Test, TestingModule } from '@nestjs/testing';
import { FilmDto, ScheduleDto } from './dto/films.dto';

describe('TskvLogger', () => {
  let controller: FilmsController;
  let filmsService: FilmsService;

  const mockFilmsService = {
    findAllFilms: jest.fn(),
    findFilmSchedule: jest.fn(),
  };
  const filmId = '1'
  const mockFilms: FilmDto[] = [{
    id: '1',
    title: 'Film 1',
  }];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilmsController],
      providers: [
        {
          provide: FilmsService,
          useValue: mockFilmsService,
        },
      ],
    }).compile();

    controller = module.get<FilmsController>(FilmsController);
    filmsService = module.get<FilmsService>(FilmsService);
  });


  describe('findAllFilms', () => {
    it('получение списка фильмов', async () => {

      jest.spyOn(filmsService, 'findAllFilms').mockResolvedValue(mockFilms);

      const result = await controller.findAllFilms();

      expect(result).toEqual({
        total: 1,
        items: mockFilms
      });
      expect(filmsService.findAllFilms).toHaveBeenCalled();
    });
  });

  describe('findFilmSchedule', () => {
    it('получение сейансов', async () => {

      const mockSchedule: ScheduleDto[] = [
        {
          id: '1',
          daytime: new Date(),
          hall: '1',
          rows: 5,
          seats: 10,
          price: 350,
          taken: []
        }
      ];
      const filmWithSchedule = {
        ...mockFilms[0],
        schedule: mockSchedule
      };

      jest.spyOn(filmsService, 'findFilmSchedule').mockResolvedValue(filmWithSchedule);

      const result = await controller.findFilmSchedule(filmId);

      expect(result).toEqual({
        total: 1,
        items: mockSchedule
      });
      expect(filmsService.findAllFilms).toHaveBeenCalled();
      expect(filmsService.findFilmSchedule).toHaveBeenCalledWith(filmId);
    });

  });


});
