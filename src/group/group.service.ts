import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Injectable()
export class GroupService {
  constructor(
    @InjectConnection() private readonly connection: mongoose.Connection,
  ) {}

  // async checkDuplicateGroupName()
  // async getAllGroup()
  // async getMyGroup()
  // async getGroupDetail()
  // async openSecretGroup()
  // async createGroup()
  // async editGroup()
  // async joinGroup()
  // async leaveGroup()
  // async deleteGroup()
  // async changeLeader()
}
