import { Field, InputType } from '@nestjs/graphql';
import * as mongoose from 'mongoose';
import { User } from 'src/entities';

@InputType()
export class CreateScheduleInput {
  @Field(() => String, { description: 'user id' })
  _id: mongoose.Types.ObjectId;

  @Field(() => String)
  when: string;

  @Field(() => String)
  spot: string;

  @Field(() => [String])
  category: string[];

  @Field(() => String, { nullable: true })
  memo: string;

  @Field(() => String)
  host: mongoose.Types.ObjectId;

  @Field(() => [String])
  guest: mongoose.Types.ObjectId[];

  @Field(() => String, { nullable: true })
  group: mongoose.Types.ObjectId;
}
