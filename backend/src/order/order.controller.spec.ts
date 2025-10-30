import { Test, TestingModule } from '@nestjs/testing';
import { describe, beforeEach, afterEach, it, expect, jest } from '@jest/globals';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { TicketDto, CreateOrderDto, OrderResponseDto } from './dto/order.dto';
import { BadRequestException } from '@nestjs/common';

describe('OrderController', () => {
  let controller: OrderController;
  let orderService: OrderService;

  const mockOrderService = {
    createOrder: jest.fn(),
  } as any;

  const mockFilm = {
    id: 'film-uuid-1',
    schedule: [
      {
        id: 'session-uuid-1',
        rows: 10,
        seats: 10,
        price: 500,
        taken: ['1:1', '1:2'],
      },
    ],
  };

  const mockCreateOrderDto: CreateOrderDto = {
    email: 'test@yandex.ru',
    phone: '+79280000000',
    tickets: [
      {
        film: 'film-uuid-1',
        session: 'session-uuid-1',
        daytime: '18:00',
        row: 1,
        seat: 1,
        price: 500,
      },
    ],
  };

  const mockOrderResponse: OrderResponseDto = {
    total: 1,
    items: [
      {
        film: 'film-uuid-1',
        session: 'session-uuid-1',
        daytime: '18:00',
        row: 1,
        seat: 1,
        price: 500,
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
    it('создание ордера', async () => {

      mockOrderService.createOrder.mockResolvedValue(mockOrderResponse);

      const result = await controller.createOrder(mockCreateOrderDto);

      expect(orderService.createOrder).toHaveBeenCalledWith(mockCreateOrderDto);
      expect(result).toEqual(mockOrderResponse);
    });
  });

});
