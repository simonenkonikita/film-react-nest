import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import * as path from 'node:path';

import { configProvider } from './app.config.provider';
import { FilmsController } from './films/films.controller';
import { OrderController } from './order/order.controller';
import { FilmsService } from './films/films.service';
import { OrderService } from './order/order.service';
import { AppRepository } from './repository/app.repository';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Films } from './entities/films.entity';
import { Schedules } from './entities/schedule.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    // Подключаем postgres
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: 'nest_project',
      entities: [Films, Schedules],
      synchronize: true,
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
  providers: [configProvider, FilmsService, OrderService, AppRepository],
})
export class AppModule {}
