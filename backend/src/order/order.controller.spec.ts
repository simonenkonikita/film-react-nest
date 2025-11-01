import { Test, TestingModule } from '@nestjs/testing';
import {
  describe,
  beforeEach,
  afterEach,
  it,
  expect,
  jest,
} from '@jest/globals';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { CreateOrderDto, OrderResponseDto } from './dto/order.dto';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('OrderController', () => {
  let controller: OrderController;
  let orderService: OrderService;

  const mockOrderService = {
    createOrder: jest.fn(),
  } as any;

  const mockCreateOrderDto: CreateOrderDto = {
    email: 'user@example.com',
    phone: '+79123456789',
    tickets: [
      {
        film: '0e33c7f6-27a7-4aa0-8e61-65d7e5effecf',
        session: '5beec101-acbb-4158-adc6-d855716b44a8',
        daytime: new Date('2024-06-28T13:00:53.000Z'),
        row: 2,
        seat: 2,
        price: 350,
      },
    ],
  };

  const mockOrderResponse: OrderResponseDto = {
    total: 1,
    items: [
      {
        id: '6a3eb1cb-7c76-4743-8d33-fb5dbfee91ae',
        film: '0e33c7f6-27a7-4aa0-8e61-65d7e5effecf',
        session: '5beec101-acbb-4158-adc6-d855716b44a8',
        daytime: new Date('2024-06-28T13:00:53.000Z'),
        row: 3,
        seat: 3,
        price: 350,
      },
    ],
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [
        {
          provide: OrderService,
          useValue: mockOrderService,
        },
      ],
    }).compile();

    controller = module.get<OrderController>(OrderController);
    orderService = module.get<OrderService>(OrderService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createOrder', () => {
    it('создание заказа', async () => {
      mockOrderService.createOrder.mockResolvedValue(mockOrderResponse);

      const result = await controller.createOrder(mockCreateOrderDto);

      expect(orderService.createOrder).toHaveBeenCalledWith(mockCreateOrderDto);
      expect(result).toEqual(mockOrderResponse);
    });
  });

  describe('должен выбрасывать ошибку при невалидных данных', () => {
    it('пустой массив tickets', async () => {
      const invalidDto = { ...mockCreateOrderDto, tickets: [] };

      mockOrderService.createOrder.mockRejectedValue(
        new BadRequestException('Выбирите хотя бы один билет'),
      );

      await expect(controller.createOrder(invalidDto)).rejects.toThrow(
        BadRequestException,
      );
      await expect(controller.createOrder(invalidDto)).rejects.toThrow(
        'Выбирите хотя бы один билет',
      );
    });

    it('отсутствует email', async () => {
      const invalidDto = { ...mockCreateOrderDto, email: undefined };
      mockOrderService.createOrder.mockRejectedValue(
        new BadRequestException('Email и телефон обязательны'),
      );

      await expect(controller.createOrder(invalidDto)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('отсутствует phone', async () => {
      const invalidDto = { ...mockCreateOrderDto, phone: undefined };
      mockOrderService.createOrder.mockRejectedValue(
        new BadRequestException('Email и телефон обязательны'),
      );

      await expect(controller.createOrder(invalidDto)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('должен обрабатывать ошибки бизнес-логики', () => {
    it('билет на несуществующий фильм', async () => {
      mockOrderService.createOrder.mockRejectedValue(
        new NotFoundException('Фильм не найден'),
      );

      await expect(controller.createOrder(mockCreateOrderDto)).rejects.toThrow(
        NotFoundException,
      );
      await expect(controller.createOrder(mockCreateOrderDto)).rejects.toThrow(
        'Фильм не найден',
      );
    });

    it('билет на несуществующий сеанс', async () => {
      mockOrderService.createOrder.mockRejectedValue(
        new NotFoundException('Сеанс не найден'),
      );

      await expect(controller.createOrder(mockCreateOrderDto)).rejects.toThrow(
        NotFoundException,
      );
      await expect(controller.createOrder(mockCreateOrderDto)).rejects.toThrow(
        'Сеанс не найден',
      );
    });

    it('попытка бронирования уже занятого места', async () => {
      mockOrderService.createOrder.mockRejectedValue(
        new BadRequestException('Место 1:1 уже занято'),
      );

      await expect(controller.createOrder(mockCreateOrderDto)).rejects.toThrow(
        BadRequestException,
      );
      await expect(controller.createOrder(mockCreateOrderDto)).rejects.toThrow(
        'Место 1:1 уже занято',
      );
    });

    it('неверные параметры места (ряд вне диапазона)', async () => {
      mockOrderService.createOrder.mockRejectedValue(
        new BadRequestException('Неверный номер ряда. Доступные ряды: 1-10'),
      );

      await expect(controller.createOrder(mockCreateOrderDto)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('несоответствие цены билета', async () => {
      mockOrderService.createOrder.mockRejectedValue(
        new BadRequestException('Неверная цена. Ожидалось: 500, получено: 300'),
      );

      await expect(controller.createOrder(mockCreateOrderDto)).rejects.toThrow(
        BadRequestException,
      );
      await expect(controller.createOrder(mockCreateOrderDto)).rejects.toThrow(
        'Неверная цена',
      );
    });
  });
});
