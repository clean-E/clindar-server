import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Schedule } from './schedule.entity';

@Schema()
@ObjectType()
export class User extends Document {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => String)
  nickname: string;

  @Field(() => String)
  email: string;
  /*
  myScheduleList
  myGroupList
  myRecord
  */
}

export const UserSchema = SchemaFactory.createForClass(User);
