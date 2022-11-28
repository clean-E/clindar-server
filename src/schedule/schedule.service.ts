import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Group, User } from 'src/entities';
import { Records } from 'src/entities/records.entity';
import { Schedule } from 'src/entities/schedule.entity';
import { CreateScheduleInput } from './dto/create-schedule.dto';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    @InjectModel(Schedule.name)
    private readonly scheduleModel: Model<Schedule>,
    @InjectModel(Records.name)
    private readonly recordsModel: Model<Records>,
    @InjectModel(Group.name)
    private readonly groupModel: Model<Group>,
    @InjectConnection() private readonly connection: mongoose.Connection,
  ) {}
  async getScheduleDetail(_id: string): Promise<Schedule> {
    const schedule = await this.scheduleModel.findById(_id);
    await schedule.populate(['host', 'group']);
    await schedule.populate({
      path: 'guest',
      populate: ['user', 'records'],
    });
    return schedule;
  }

  async getMySchedule(email: string): Promise<Schedule[]> {
    const user = await (
      await this.userModel.findOne({ email })
    ).populate('myScheduleList');

    return user.myScheduleList;
  }

  //async getGroupSchedule()

  async createSchedule(schedule: CreateScheduleInput): Promise<Schedule> {
    const userId = schedule._id;
    delete schedule._id;
    const session = await this.connection.startSession();
    let newSchedule: Schedule;
    try {
      session.startTransaction();

      newSchedule = await this.scheduleModel.create(schedule);

      await this.userModel.findByIdAndUpdate(userId, {
        $push: { myScheduleList: newSchedule._id },
      });
      await session.commitTransaction();
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
    return newSchedule;
  }
  // async editSchedule()
  // async deleteSchedule()
  // async joinSchedule()
  // async comeoutSchedule()
  // async inviteSchedule()
}
