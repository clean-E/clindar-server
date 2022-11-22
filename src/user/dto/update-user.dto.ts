import { Field, InputType } from '@nestjs/graphql';
import * as mongoose from 'mongoose';

@InputType()
export class UpdateUserInput {
  @Field(() => String)
  id: mongoose.Types.ObjectId;

  @Field(() => String)
  nickname: string;

  @Field(() => String)
  email: string;
}
