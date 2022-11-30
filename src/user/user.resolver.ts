import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from 'src/entities';
import { UserInput } from './dto/create-user.dto';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}
  @Query(() => User)
  async getUser(@Args('id') id: string) {
    return await this.userService.getUser(id);
  }

  @Query(() => [User])
  async getAllUser() {
    return await this.userService.getAllUser();
  }

  @Mutation(() => User)
  async login(@Args('userInfo') userInfo: UserInput) {
    return await this.userService.login(userInfo);
  }

  @Mutation(() => User)
  async setNickname(@Args('userInfo') userInfo: UserInput) {
    return await this.userService.setNickname(userInfo);
  }
}
