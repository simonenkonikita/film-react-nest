import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import * as path from 'node:path';

import { FilmsController } from './films/films.controller';
import { OrderController } from './order/order.controller';
import { FilmsService } from './films/films.service';
import { OrderService } from './order/order.service';
import { AppRepository } from './repository/app.repository';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Films } from './entities/films.entity';
import { Schedules } from './entities/schedule.entity';
import { envValidationSchema } from '../config/env.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      validationSchema: envValidationSchema,
    }),
    // Подключаем postgres
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [Films, Schedules],
      synchronize: process.env.NODE_ENV !== 'production',
    }),
    // Регистрируем схемы
    TypeOrmModule.forFeature([Films, Schedules]),

    // @todo: Добавьте раздачу статических файлов из public
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', 'public'),
      serveRoot: '/static',
    }),
  ],
  controllers: [FilmsController, OrderController],
  providers: [FilmsService, OrderService, AppRepository],
})
export class AppModule { }
