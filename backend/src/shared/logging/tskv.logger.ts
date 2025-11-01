import { LoggerService, Injectable } from '@nestjs/common';

@Injectable()
export class TskvLogger implements LoggerService {
  private formatMessage(level: string, message: any, ...optionalParams: any[]): string {
    const timestamp = new Date().toISOString();

    const fields = [
      `timestamp=${timestamp}`,
      `level=${level}`,
      `message=${JSON.stringify(message)}`,
    ];

    if (optionalParams.length > 0) {
      optionalParams.forEach((param, index) => {
        fields.push(`param${index}=${JSON.stringify(param)}`);
      });
    }

    return fields.join('\t') + '\n';
  }

  log(message: any, ...optionalParams: any[]) {
    process.stdout.write(this.formatMessage('log', message, ...optionalParams));
  }

  error(message: any, ...optionalParams: any[]) {
    process.stderr.write(this.formatMessage('error', message, ...optionalParams));
  }

  warn(message: any, ...optionalParams: any[]) {
    process.stdout.write(this.formatMessage('warn', message, ...optionalParams));
  }

  debug(message: any, ...optionalParams: any[]) {
    process.stdout.write(this.formatMessage('debug', message, ...optionalParams));
  }

  verbose(message: any, ...optionalParams: any[]) {
    process.stdout.write(this.formatMessage('verbose', message, ...optionalParams));
  }
}