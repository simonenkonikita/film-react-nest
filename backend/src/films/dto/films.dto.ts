//TODO описать DTO для запросов к /films

import { Type } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Min,
  ValidateNested,
} from 'class-validator';

export class FilmDto {
  @IsUUID()
  id: string;
  @IsOptional()
  @IsNumber()
  @Min(0)
  rating?: number;
  @IsOptional()
  @IsString()
  director?: string;
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];
  @IsOptional()
  @IsString()
  image?: string;
  @IsOptional()
  @IsString()
  cover?: string;
  @IsOptional()
  @IsString()
  title?: string;
  @IsOptional()
  @IsString()
  about?: string;
  @IsOptional()
  @IsString()
  description?: string;
  schedule?: ScheduleDto[];
}

export class ScheduleDto {
  @IsUUID()
  id: string;
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  daytime: Date;
  @IsOptional()
  @IsString()
  hall: string;
  @IsOptional()
  @IsNumber()
  @Min(1)
  rows: number;
  @IsOptional()
  @IsNumber()
  @Min(1)
  seats: number;
  @IsOptional()
  @IsNumber()
  @Min(0)
  price: number;
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  taken: string[];
}

export class FilmsAllDto {
  @IsNumber()
  @Min(0)
  total: number;
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FilmDto)
  items: FilmDto[];
}

export class ScheduleAllDto {
  @IsNumber()
  @Min(0)
  total: number;
  @ValidateNested({ each: true })
  @Type(() => ScheduleDto)
  items: ScheduleDto[];
}
