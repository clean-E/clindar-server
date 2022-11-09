import { Args, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}
  @Query(() => Boolean)
  async getUser(@Args('id') id: string) {
    return await this.userService.getUser(id);
  }
}
