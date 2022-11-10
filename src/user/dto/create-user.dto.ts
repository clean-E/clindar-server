import { Field, InputType, PickType } from '@nestjs/graphql';
import { User } from 'src/entities';

@InputType()
export class UserInput {
  @Field(() => String)
  nickname: string;
  @Field(() => String)
  email: string;
}
