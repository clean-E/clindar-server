import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Schedule } from './schedule.entity';

@Schema()
@InputType()
@ObjectType()
export class User {
  @Field(() => String)
  _id: mongoose.Types.ObjectId;

  @Prop()
  @Field(() => String)
  nickname: string;

  @Prop()
  @Field(() => String)
  email: string;
  /*
  myScheduleList
  myGroupList
  myRecord
  */
}

export const UserSchema = SchemaFactory.createForClass(User);
