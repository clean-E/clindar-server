import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/entities';
import { UserInput } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    @InjectConnection() private readonly connection: mongoose.Connection,
  ) {}
  async getUser(id: string): Promise<User> {
    return await this.userModel.findById(id);
  }
  async login(userInfo: UserInput): Promise<User> {
    const { email, nickname } = userInfo;

    const userExists = await this.userModel.exists({ email });
    const session = await this.connection.startSession();
    if (userExists === null) {
      // 회원 정보가 없음, 첫 로그인 -> 유저 정보 생성
      session.startTransaction();
      try {
        await this.userModel.create({
          email,
          nickname,
          myGroupList: [],
          myScheduleList: [],
          myRecord: [],
        });
        await session.commitTransaction();
      } catch (error) {
        await session.abortTransaction();
        throw error;
      } finally {
        session.endSession();
      }
    }
    return await this.userModel.findOne({ email });
  }
}
