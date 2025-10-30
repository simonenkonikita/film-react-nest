import { LoggerService, Injectable } from '@nestjs/common';

@Injectable()
export class JsonLogger implements LoggerService {

  private formatMessage(level: string, message: any, ...optionalParams: any[]) {

    const timestamp = new Date().toISOString();

    return JSON.stringify({
      timestamp,
      level,
      message,
      ...optionalParams
    });
  }

  log(message: any, ...optionalParams: any[]) {
    console.log(this.formatMessage('log', message, ...optionalParams));
  }

  error(message: any, ...optionalParams: any[]) {
    console.error(this.formatMessage('error', message, ...optionalParams));
  }

  warn(message: any, ...optionalParams: any[]) {
    console.warn(this.formatMessage('warn', message, ...optionalParams));
  }

  debug(message: any, ...optionalParams: any[]) {
    console.debug(this.formatMessage('debug', message, ...optionalParams));
  }

  verbose(message: any, ...optionalParams: any[]) {
    console.info(this.formatMessage('verbose', message, ...optionalParams));
  }
}