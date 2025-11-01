import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrderDto, OrderResponseDto, TicketDto } from './dto/order.dto';
import { v4 as uuidv4 } from 'uuid';
import { AppRepository } from '../repository/app.repository';

@Injectable()
export class OrderService {
  constructor(private readonly filmsRepository: AppRepository) {}

  async createOrder(data: CreateOrderDto): Promise<OrderResponseDto> {
    if (!data.tickets || data.tickets.length === 0) {
      throw new BadRequestException('Выбирите хотя бы один билет');
    }

    if (!data.email || !data.phone) {
      throw new BadRequestException('Email и телефон обязательны');
    }

    const bookedTickets = [];

    for (const ticket of data.tickets) {
      const bookedTicket = await this.processTicket(ticket);
      bookedTickets.push(bookedTicket);
    }

    return {
      total: bookedTickets.length,
      items: bookedTickets,
    };
  }

  private async processTicket(ticket: TicketDto) {
    const filmId = ticket.film;
    const scheduleId = ticket.session;

    //  Найти фильм по filmId
    const film = await this.filmsRepository.findFilmSchedule(filmId);
    if (!film) {
      throw new NotFoundException('Фильм не найден');
    }

    // 2. Найти сеанс по scheduleId
    const schedule = film.schedule.find((s) => s.id === scheduleId);
    if (!schedule) {
      throw new NotFoundException('Сеанс не найден');
    }

    // Проверить валидность места
    this.validateSeat(ticket, schedule);

    //  Проверка места
    this.checkSeat(ticket, schedule);

    //  Забронировать место
    await this.reserveSeat(ticket, filmId, scheduleId, schedule);

    return {
      id: uuidv4(),
      film: ticket.film,
      session: ticket.session,
      daytime: ticket.daytime,
      row: ticket.row,
      seat: ticket.seat,
      price: ticket.price,
    };
  }

  private validateSeat(ticket: TicketDto, schedule: any): void {
    // Проверка ряда
    if (ticket.row < 1 || ticket.row > schedule.rows) {
      throw new BadRequestException(
        `Неверный номер ряда. Доступные ряды: 1-${schedule.rows}`,
      );
    }

    // Проверка места
    if (ticket.seat < 1 || ticket.seat > schedule.seats) {
      throw new BadRequestException(
        `Неверный номер места. Доступные места: 1-${schedule.seats}`,
      );
    }

    // Проверка цены
    if (ticket.price !== schedule.price) {
      throw new BadRequestException(
        `Неверная цена. Ожидалось: ${schedule.price}, получено: ${ticket.price}`,
      );
    }
  }

  private checkSeat(ticket: TicketDto, schedule: any): void {
    const seatKey = `${ticket.row}:${ticket.seat}`;

    if (schedule.taken.includes(seatKey)) {
      throw new BadRequestException(`Место ${seatKey} уже занято`);
    }
  }

  private async reserveSeat(
    ticket: TicketDto,
    filmId: string,
    scheduleId: string,
    schedule: any,
  ): Promise<void> {
    const seatKey = `${ticket.row}:${ticket.seat}`;
    const updatedTaken = [...schedule.taken, seatKey];

    try {
      await this.filmsRepository.updateSessionTakenSeats(
        filmId,
        scheduleId,
        updatedTaken,
      );
    } catch (error) {
      throw new BadRequestException(
        'Ошибка при бронировании места. Попробуйте еще раз.',
      );
    }
  }
}
