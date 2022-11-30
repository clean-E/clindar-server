import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UserInput {
  @Field(() => String)
  nickname: string;

  @Field(() => String)
  email: string;
}
