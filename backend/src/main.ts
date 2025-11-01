import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { ValidationPipe } from '@nestjs/common';
import { LoggerFactory } from './shared/logging/logger.factory';


async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true,
  });

  const loggerType = process.env.LOGGER_TYPE || 'dev';
  const logger = LoggerFactory.create(loggerType);
  app.useLogger(logger);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.setGlobalPrefix('api/afisha');
  await app.listen(3000);
}

bootstrap();
