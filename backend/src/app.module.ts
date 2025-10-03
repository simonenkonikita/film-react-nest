import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import * as path from 'node:path';
import { MongooseModule } from '@nestjs/mongoose';

import { configProvider } from './app.config.provider';
import { FilmsController } from './films/films.controller';
import { OrderController } from './order/order.controller';
import { FilmsService } from './films/films.service';
import { OrderService } from './order/order.service';
import { FilmsRepository } from './repository/film/films.repository';
import { Film, FilmSchema } from './films/models/films.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    // Подключаем MongoDB
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: process.env.DATABASE_URL || 'mongodb://localhost:27017/afisha',
      }),
    }),
    // Регистрируем схемы
    MongooseModule.forFeature([{ name: Film.name, schema: FilmSchema }]),
    // @todo: Добавьте раздачу статических файлов из public
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', 'public'),
      serveRoot: '/static',
    }),
  ],
  controllers: [FilmsController, OrderController],
  providers: [configProvider, FilmsService, OrderService, FilmsRepository],
})
export class AppModule {}
