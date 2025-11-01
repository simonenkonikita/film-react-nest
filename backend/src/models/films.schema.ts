import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Schedule } from './schedule.schema';

export type FilmDocument = Film & Document;

@Schema()
export class Film extends Document {
  @Prop({ required: true, unique: true })
  id: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  director: string;

  @Prop({ required: true, min: 0, max: 10 })
  rating: number;

  @Prop({ type: [String] })
  tags: string[];

  @Prop({ required: true })
  image: string;

  @Prop({ required: true })
  cover: string;

  @Prop({ required: true })
  about: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: [Schedule] })
  schedule: Schedule[];
}

export const FilmSchema = SchemaFactory.createForClass(Film);
