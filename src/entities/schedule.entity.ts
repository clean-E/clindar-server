import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';

@Schema()
@ObjectType()
export class Schedule {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;
  @Prop()
  @Field(() => String)
  when: string;
  @Prop()
  @Field(() => String)
  spot: string;
  @Prop()
  @Field(() => [String])
  category: string[];
  @Prop()
  @Field(() => String)
  memo: string;

  // host
  // guest
  // group
}

export const ScheduleSchema = SchemaFactory.createForClass(Schedule);
