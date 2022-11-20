import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from './user.entity';

@Schema()
@ObjectType()
export class Schedule {
  @Field(() => String)
  _id: mongoose.Types.ObjectId;

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

  @Prop({ type: User, ref: 'User' })
  @Field(() => User)
  host: User;

  // guest
  // group
}

export const ScheduleSchema = SchemaFactory.createForClass(Schedule);
