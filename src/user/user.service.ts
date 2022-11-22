import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/entities';
import { CreateUserInput } from './dto/create-user.dto';

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
  async login(userInfo: CreateUserInput): Promise<User> {
    const { email } = userInfo;
    let user = await this.userModel.findOne({ email });

    if (user === null) {
      const session = await this.connection.startSession();
      // 회원 정보가 없음, 첫 로그인 -> 유저 정보 생성

      await session.withTransaction(async () => {
        userInfo['myScheduleList'] = [];
        user = await this.userModel.create(userInfo);
      });
      session.endSession();
    }
    return user;
  }
}
