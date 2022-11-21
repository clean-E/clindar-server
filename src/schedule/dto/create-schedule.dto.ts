import { Field, InputType } from '@nestjs/graphql';
import * as mongoose from 'mongoose';
import { User } from 'src/entities';

@InputType()
export class CreateScheduleInput {
  @Field(() => String)
  when: string;

  @Field(() => String)
  spot: string;

  @Field(() => [String])
  category: string[];

  @Field(() => String)
  memo: string;

  @Field(() => String)
  host: mongoose.Types.ObjectId;
}
