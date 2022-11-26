import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Schedule } from './schedule.entity';
import { User } from './user.entity';

@Schema()
@InputType('GroupInput')
@ObjectType('Group')
export class Group {
  @Field(() => String)
  _id: mongoose.Types.ObjectId;

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

  @Prop({ type: mongoose.Types.ObjectId, ref: 'User' })
  @Field(() => User)
  leader: User['nickname'];

  @Prop({ type: Date, default: Date.now })
  @Field(() => Date)
  createdAt: Date;

  @Prop({ type: [mongoose.Types.ObjectId], ref: 'User' })
  @Field(() => [User])
  memberList: User[];

  @Prop({ type: [mongoose.Types.ObjectId], ref: 'Schedule' })
  @Field(() => [Schedule])
  scheduleList: Schedule[];
}

export const GroupSchema = SchemaFactory.createForClass(Group);
