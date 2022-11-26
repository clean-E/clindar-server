import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { User } from 'src/entities';
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
    @InjectConnection() private readonly connection: mongoose.Connection,
  ) {}
  //async getMySchedule()
  //async getGroupSchedule()
  async getScheduleDetail(_id: string): Promise<Schedule> {
    const schedule = await this.scheduleModel.findById(_id);
    await schedule.populate('host');
    // await (await schedule.populate('guest')).populate('nickname');
    // await schedule.populate('group');
    return schedule;
  }

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
