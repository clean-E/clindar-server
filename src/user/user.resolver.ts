import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from 'src/entities';
import { CreateUserInput } from './dto/create-user.dto';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}
  @Query(() => User)
  async getUser(@Args('id') id: string) {
    return await this.userService.getUser(id);
  }

  @Mutation(() => User)
  async login(@Args('userInfo') userInfo: CreateUserInput) {
    return await this.userService.login(userInfo);
  }
}
