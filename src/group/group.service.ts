import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Group } from 'src/entities';
import { CreateGroupInput } from './dto/create-group.dto';

@Injectable()
export class GroupService {
  constructor(
    @InjectModel(Group.name)
    private readonly groupModel: Model<Group>,
    @InjectConnection() private readonly connection: mongoose.Connection,
  ) {}

  // async checkDuplicateGroupName()
  // async getAllGroup()
  // async getMyGroup()
  // async getGroupDetail()
  // async openSecretGroup()
  async createGroup(group: CreateGroupInput): Promise<Group> {
    const userId = group._id;
    delete group._id;

    group['leader'] = userId;
    group['createdAt'] = new Date();
    group['memberList'] = [userId];
    group['scheduleList'] = [];

    const newGroup = await this.groupModel.create(group);

    return await (
      await (
        await this.groupModel.findOne({ where: { id: newGroup.id } })
      ).populate('leader')
    ).populate('memberList');
  }
  // async editGroup()
  // async joinGroup()
  // async leaveGroup()
  // async deleteGroup()
  // async changeLeader()
}
