import { Prop, Schema } from '@nestjs/mongoose';

@Schema({ _id: false })
export class Schedule {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  daytime: Date;

  @Prop({ required: true })
  hall: string;

  @Prop({ required: true })
  rows: number;

  @Prop({ required: true })
  seats: number;

  @Prop({ required: true })
  price: number;

  @Prop({ type: [String], default: [] })
  taken: string[];
}
