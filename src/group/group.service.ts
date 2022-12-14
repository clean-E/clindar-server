import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Group, User } from 'src/entities';
import { CreateGroupInput } from './dto/create-group.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class GroupService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    @InjectModel(Group.name)
    private readonly groupModel: Model<Group>,
    @InjectConnection() private readonly connection: mongoose.Connection,
  ) {}

  async checkDuplicateGroupName(groupName: string): Promise<boolean> {
    return (await this.groupModel.exists({ groupName })) ? true : false;
  }
  async getAllGroup(): Promise<Group[]> {
    return await this.groupModel.find();
  }
  async getMyGroup(id: string): Promise<Group[]> {
    const user = await this.userModel.findById(id).populate('myGroupList');

    return user.myGroupList;
  }
  async getGroupDetail(id: string): Promise<Group> {
    return await this.groupModel.findById(id, null, {
      populate: ['leader', 'memberList', 'scheduleList'],
    });
  }

  // async openSecretGroup(id: string, password: string): Promise<Group> {
  //   // 그룹 조회, 비밀번호 비교
  // }

  async createGroup(group: CreateGroupInput): Promise<Group> {
    const userId = group._id;
    delete group._id;

    group['leader'] = userId;
    group['createdAt'] = new Date();
    group['memberList'] = [userId];
    group['scheduleList'] = [];

    let newGroup;
    try {
      this.connection.transaction(async (session) => {
        if (group.secret) {
          group.password = await bcrypt.hash(
            group.password,
            Number(process.env.SALT),
          );
        }
        newGroup = await this.groupModel.create(group);

        await this.userModel.findByIdAndUpdate(
          userId,
          {
            $push: { myGroupList: newGroup._id },
          },
          { session },
        );
      });
    } catch (e) {
      throw e;
    }

    return await this.groupModel.findOne({ id: newGroup.id }, null, {
      populate: ['leader', 'memberList'],
    });
  }
  // async editGroup()
  async joinGroup(groupId: string, userId: string): Promise<Group> {
    await this.groupModel.updateOne(
      { _id: groupId },
      { $push: { memberList: userId } },
    );

    await this.userModel.updateOne(
      { _id: userId },
      { $push: { myGroupList: groupId } },
    );

    return await this.groupModel.findById(groupId, null, {
      populate: ['leader', 'memberList'],
    });
  }

  // async leaveGroup(groupId: string, userId: string): Promise<Group> {
  //   // 그룹 조회, 멤버에서 제거, 유저 그룹 목록에서 제거
  // }

  // async deleteGroup(groupId: string, userId: string): Promise<Group> {
  //   // 그룹 조회, 리더 확인, 그룹 제거
  // }

  // async changeLeader(
  //   groupId: string,
  //   userId: string,
  //   newLeaderId: string,
  // ): Promise<Group> {
  //   // 그룹 조회, 리더 확인, 리더 교체
  // }
}
