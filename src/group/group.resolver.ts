import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Group } from 'src/entities';
import { GroupService } from './group.service';
import { CreateGroupInput } from './dto/create-group.dto';

@Resolver()
export class GroupResolver {
  constructor(private readonly groupService: GroupService) {}

  @Mutation(() => Group)
  async createGroup(@Args('group') group: CreateGroupInput) {
    return await this.groupService.createGroup(group);
  }
}
