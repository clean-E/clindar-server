import { Field, InputType, PickType } from '@nestjs/graphql';
import { Schema } from 'mongoose';
import { User } from 'src/entities';

@InputType()
export class UpdateUserInput {
  @Field(() => String)
  id: Schema.Types.ObjectId;

  @Field(() => String)
  nickname: string;

  @Field(() => String)
  email: string;
}
