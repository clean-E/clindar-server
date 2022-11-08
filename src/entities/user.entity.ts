import { Field, ObjectType } from '@nestjs/graphql';
import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';

@Schema()
@ObjectType()
export class User {
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
