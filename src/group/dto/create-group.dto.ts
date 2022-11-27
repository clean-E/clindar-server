import { Field, InputType, Int } from '@nestjs/graphql';
import * as mongoose from 'mongoose';
import { User } from 'src/entities';

@InputType()
export class CreateGroupInput {
  @Field(() => String, { description: 'user id' })
  _id: mongoose.Types.ObjectId;

  @Field(() => String)
  groupName: string;

  @Field(() => String)
  description: string;

  @Field(() => Boolean)
  secret: boolean;

  @Field(() => String)
  password: string;

  @Field(() => String)
  mainCategory: string;

  @Field(() => [Int])
  age: number[];
}
