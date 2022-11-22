import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as mongoose from 'mongoose';
import { User, UserDocument } from 'src/entities';
import { CreateUserInput } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    @InjectConnection() private readonly connection: mongoose.Connection,
  ) {}
  async getUser(id: string): Promise<User> {
    return await this.userModel.findById(id);
  }
  async login(userInfo: CreateUserInput): Promise<User> {
    const { email } = userInfo;
    const user = await this.userModel.findOne({ email });
    let newUser;
    // 회원 정보가 없음, 첫 로그인 -> 유저 정보 생성
    if (user === null) {
      const session = await this.connection.startSession();
      session.startTransaction();
      userInfo['myScheduleList'] = [];
      try {
        newUser = await this.userModel.create(userInfo);
        if (!newUser) {
          throw new NotFoundException();
        }
        await session.commitTransaction();
      } catch (error) {
        await session.abortTransaction();
        throw error;
      } finally {
        session.endSession();
      }
    }
    return user ? user : newUser;
  }
}
