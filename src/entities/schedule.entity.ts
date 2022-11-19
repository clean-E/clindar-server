import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Schema as MongooseSchema } from 'mongoose';
import { User } from './user.entity';

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

  @Prop()
  @Field(() => User)
  host: User;

  // guest
  // group
}

export const ScheduleSchema = SchemaFactory.createForClass(Schedule);
