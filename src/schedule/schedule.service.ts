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
    const user = await this.userModel.findOne({ email }, null, {
      populate: 'myScheduleList',
    });

    return user.myScheduleList;
  }

  async getGroupSchedule(email: string): Promise<Schedule[]> {
    const user = await this.userModel.findOne({ email });
    await user.populate({
      path: 'myGroupList',
      populate: 'scheduleList',
    });

    let groupSchedule: Schedule[];
    for (const group of user.myGroupList) {
      groupSchedule = [...groupSchedule, ...group.scheduleList];
    }

    return groupSchedule;
  }

  async createSchedule(schedule: CreateScheduleInput): Promise<Schedule> {
    const userId = schedule._id;
    delete schedule._id;
    const session = await this.connection.startSession();
    let newSchedule;
    try {
      session.startTransaction();
      if (!schedule.group) {
        schedule.group = null;
      }

      newSchedule = await this.scheduleModel.create(schedule);

      await this.userModel.findByIdAndUpdate(userId, {
        $push: { myScheduleList: newSchedule._id },
      });

      if (schedule.group) {
        await this.groupModel.findOneAndUpdate(schedule.group, {
          $push: { scheduleList: newSchedule._id },
        });
      }

      const guest = await Promise.all(
        schedule.guest.map(async (id) => {
          const newRecord = await this.recordsModel.create({
            schedule: newSchedule._id,
            user: id,
            records: [],
          });
          return newRecord._id;
        }),
      );
      await this.scheduleModel.findOneAndUpdate(newSchedule._id, {
        guest,
      });

      await session.commitTransaction();
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
    newSchedule = await this.scheduleModel.findById(newSchedule._id);
    await newSchedule.populate(['host', 'group']);
    await newSchedule.populate({
      path: 'guest',
      populate: ['user', 'records'],
    });
    console.log(newSchedule);
    return newSchedule;
  }
  // async editSchedule()
  // async deleteSchedule()
  // async joinSchedule()
  // async comeoutSchedule()
  // async inviteSchedule()
}
