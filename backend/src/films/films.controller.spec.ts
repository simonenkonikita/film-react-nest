import { FilmsController } from './films.controller';
import { describe, beforeEach, afterEach, it, expect, jest } from '@jest/globals';
import { FilmsService } from './films.service';
import { Test, TestingModule } from '@nestjs/testing';
import { FilmDto, ScheduleDto } from './dto/films.dto';
import { NotFoundException } from '@nestjs/common';

describe('FilmsController', () => {
  let controller: FilmsController;
  let filmsService: FilmsService;


  const mockFilmsService = {
    findAllFilms: jest.fn<() => Promise<FilmDto[]>>(),
    findFilmSchedule: jest.fn<(id: string) => Promise<FilmDto>>(),
  };

  const filmId = "0e33c7f6-27a7-4aa0-8e61-65d7e5effecf";

  const mockFilms: FilmDto[] = [{
    id: "0e33c7f6-27a7-4aa0-8e61-65d7e5effecf",
    title: "Архитекторы общества",
    director: "Итан Райт",
    rating: 2.9,
    tags: [
      "Документальный"
    ],
    image: "/bg1s.jpg",
    cover: "/bg1c.jpg",
    about: "Документальный фильм, исследующий влияние искусственного интеллекта на общество и этические, философские и социальные последствия технологии.",
    description: "Документальный фильм Итана Райта исследует влияние технологий на современное общество, уделяя особое внимание роли искусственного интеллекта в формировании нашего будущего. Фильм исследует этические, философские и социальные последствия гонки технологий ИИ и поднимает вопрос: какой мир мы создаём для будущих поколений.",
    schedule: [
      {
        id: "89ee32f3-8164-40a6-b237-f4d492450250",
        daytime: new Date("2024-06-28T13:00:53.000Z"),
        hall: "2",
        rows: 5,
        seats: 10,
        price: 350,
        taken: []
      }
    ]
  }];

  const mockSchedule: ScheduleDto[] = [
    {
      id: "89ee32f3-8164-40a6-b237-f4d492450250",
      daytime: new Date("2024-06-28T13:00:53.000Z"),
      hall: "2",
      rows: 5,
      seats: 10,
      price: 350,
      taken: []
    }
  ]

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

  afterEach(() => {
    jest.clearAllMocks();
  });



  describe('findAllFilms', () => {
    it('должен возвращать список всех фильмов', async () => {

      jest.spyOn(filmsService, 'findAllFilms').mockResolvedValue(mockFilms);

      const result = await controller.findAllFilms();

      expect(result).toEqual({
        total: mockFilms.length,
        items: mockFilms
      });
      expect(filmsService.findAllFilms).toHaveBeenCalled();
    });

    it('должен возвращать пустой список, если фильмов нет', async () => {

      mockFilmsService.findAllFilms.mockResolvedValue([]);

      const result = await controller.findAllFilms();

      expect(result).toEqual({
        total: 0,
        items: []
      });
      expect(filmsService.findAllFilms).toHaveBeenCalled();
    });

    it('должен пробрасывать ошибку от сервиса', async () => {
      mockFilmsService.findAllFilms.mockRejectedValue(new NotFoundException('Список фильмов пуст'));

      await expect(controller.findAllFilms())
        .rejects.toThrow(NotFoundException);
      await expect(controller.findAllFilms())
        .rejects.toThrow('Список фильмов пуст');
    });
  });

  describe('findFilmSchedule', () => {
    it('должен возвращать расписание для указанного фильма', async () => {


      const filmWithSchedule = {
        ...mockFilms[0],
        schedule: mockSchedule
      };

      mockFilmsService.findFilmSchedule.mockResolvedValue(filmWithSchedule);

      const result = await controller.findFilmSchedule(filmId);

      expect(result).toEqual({
        total: mockSchedule.length,
        items: mockSchedule
      });
      expect(filmsService.findFilmSchedule).toHaveBeenCalledWith(filmId);
    });

    it('должен возвращать пустое расписание, если сеансов нет', async () => {
      const filmWithoutSchedule = {
        ...mockFilms[0],
        schedule: []
      };

      mockFilmsService.findFilmSchedule.mockResolvedValue(filmWithoutSchedule);

      const result = await controller.findFilmSchedule(filmId);

      expect(result).toEqual({
        total: 0,
        items: []
      });
      expect(filmsService.findFilmSchedule).toHaveBeenCalledWith(filmId);
    });

    it('должен пробрасывать ошибку от сервиса', async () => {
      mockFilmsService.findFilmSchedule.mockRejectedValue(new NotFoundException('Фильм не найден'));

      await expect(controller.findFilmSchedule(filmId))
        .rejects.toThrow(NotFoundException);
      await expect(controller.findFilmSchedule(filmId))
        .rejects.toThrow('Фильм не найден');
    });

  });
});