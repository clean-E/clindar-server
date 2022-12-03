import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Schedule } from './schedule.entity';
import { User } from './user.entity';

@Schema()
@InputType('RecordInput')
@ObjectType('Record')
export class Record {
  @Field(() => String)
  level: string;

  @Field(() => String)
  nameOrColor: string;

  @Field(() => Int)
  count: number;
}

@Schema()
@InputType('RecordsInput')
@ObjectType('Records')
export class Records {
  @Field(() => String)
  _id: mongoose.Types.ObjectId;

  @Prop({ type: mongoose.Types.ObjectId, ref: 'Schedule' })
  @Field(() => Schedule)
  schedule: Schedule;

  @Prop({ type: mongoose.Types.ObjectId, ref: 'User' })
  @Field(() => User)
  user: User;

  @Prop(
    raw({
      level: String,
      nameOrColor: String,
      count: Number,
    }),
  )
  @Field(() => [Record], { nullable: true })
  records: Record[];
}

export const RecordsSchema = SchemaFactory.createForClass(Records);
