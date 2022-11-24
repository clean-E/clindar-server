import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Group } from './group.entity';
import { User } from './user.entity';

@Schema()
@InputType('ScheduleInput')
@ObjectType('Schedule')
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

  @Prop({ type: mongoose.Types.ObjectId, ref: 'User' })
  @Field(() => User)
  host: User;

  // guest

  @Prop({ type: mongoose.Types.ObjectId, ref: 'Group' })
  @Field(() => Group)
  group: Group;
}

export const ScheduleSchema = SchemaFactory.createForClass(Schedule);
