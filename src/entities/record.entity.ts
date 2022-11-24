import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Prop, Schema } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Schedule } from './schedule.entity';
import { User } from './user.entity';

@Schema()
@InputType('RecordInput')
@ObjectType('Record')
export class Record {
  @Field(() => String)
  _id: mongoose.Types.ObjectId;

  @Prop({ type: mongoose.Types.ObjectId, ref: 'Schedule' })
  @Field(() => Schedule)
  sId: Schedule;

  @Prop({ type: mongoose.Types.ObjectId, ref: 'User' })
  @Field(() => User)
  uId: User;

  //   records:

  //   scheduleId: ObjectId, (일정 데이터의 오브젝트 id)
  // userId: ObjectId, (유저 데이터의 오브젝트 id)
  // records: [ {level: string,
  // 						nameOrColor: string,
  // 					  count: number} ]
}
