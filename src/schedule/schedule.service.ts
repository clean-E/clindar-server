import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Schedule } from 'src/entities/schedule.entity';
import { CreateScheduleInput } from './dto/create-schedule.dto';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectModel(Schedule.name)
    private readonly scheduleModel: Model<Schedule>,
    @InjectConnection() private readonly connection: mongoose.Connection,
  ) {}
  async getScheduleDetail(_id: string): Promise<Schedule> {
    const schedule = await this.scheduleModel.findById(_id);
    await schedule.populate('host');
    return schedule;
  }

  async createSchedule(schedule: CreateScheduleInput): Promise<Schedule> {
    const session = await this.connection.startSession();
    let newSchedule;
    try {
      session.startTransaction();

      newSchedule = await this.scheduleModel.create(schedule);
      await session.commitTransaction();
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
    return newSchedule;
  }
}
