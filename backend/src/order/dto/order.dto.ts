//TODO реализовать DTO для /orders

import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Matches,
  Min,
  ValidateNested,
} from 'class-validator';

export class TicketDto {
  @IsUUID()
  film: string;
  @IsUUID()
  session: string;
  @IsOptional()
  @IsString()
  daytime?: string;
  @IsOptional()
  @IsNumber()
  @Min(1)
  row?: number;
  @IsOptional()
  @IsNumber()
  @Min(1)
  seat?: number;
  @IsOptional()
  @IsNumber()
  @Min(0)
  price?: number;
}

export class CreateOrderDto {
  @IsEmail()
  @Matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, {
    message: 'Invalid email format',
  })
  email: string;
  @IsString()
  @IsNotEmpty()
  @Matches(/^(\+7|8)?9\d{9}$/, {
    message: 'Phone number must contain at least 10 digits',
  })
  phone: string;
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => TicketDto)
  tickets: TicketDto[];
}

export class OrderResponseDto {
  total: number;
  items: TicketDto[];
}
