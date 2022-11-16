import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';

@Schema()
@ObjectType()
export class Group {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;
  @Prop()
  @Field(() => String)
  groupName: string;

  @Prop()
  @Field(() => String)
  description: string;

  @Prop()
  @Field(() => Boolean)
  secret: boolean;

  @Prop()
  @Field(() => String)
  mainCategory: string;

  @Prop()
  @Field(() => [Int])
  age: number[];

  @Prop()
  @Field(() => String)
  password: string;

  //   leader: { type: String },
  //   createdAt: { type: String },
  //   memberList: [{ type: String }],
  //   schedules: [{ type: String }],
}

export const ScheduleSchema = SchemaFactory.createForClass(Group);
