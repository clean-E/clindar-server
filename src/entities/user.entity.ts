import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Group } from './group.entity';
import { Records } from './records.entity';
import { Schedule } from './schedule.entity';

export type UserDocument = User & mongoose.Document;

@Schema()
@InputType('UserInput')
@ObjectType('User')
export class User {
  @Field(() => String)
  _id: mongoose.Types.ObjectId;

  @Prop()
  @Field(() => String)
  nickname: string;

  @Prop()
  @Field(() => String)
  email: string;

  @Prop({ type: [mongoose.Types.ObjectId], ref: 'Schedule' })
  @Field(() => [Schedule], { nullable: true })
  myScheduleList: Schedule[];

  @Prop({ type: [mongoose.Types.ObjectId], ref: 'Group' })
  @Field(() => [Group], { nullable: true })
  myGroupList: Group[];

  @Prop({ type: [mongoose.Types.ObjectId], ref: 'Records' })
  @Field(() => [Records], { nullable: true })
  myRecordList: Records[];
}

export const UserSchema = SchemaFactory.createForClass(User);
