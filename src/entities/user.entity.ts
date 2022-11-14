import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import { Schedule } from './schedule.entity';

@Schema()
@ObjectType()
export class User {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;
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
