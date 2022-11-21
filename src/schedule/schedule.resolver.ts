import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Schedule } from 'src/entities/schedule.entity';
import { ScheduleService } from './schedule.service';
import { CreateScheduleInput } from './dto/create-schedule.dto';

@Resolver()
export class ScheduleResolver {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Query(() => Schedule)
  async getScheduleDetail(@Args('_id') _id: string) {
    return await this.scheduleService.getScheduleDetail(_id);
  }

  @Mutation(() => Schedule)
  async createSchedule(@Args('schedule') schedule: CreateScheduleInput) {
    return await this.scheduleService.createSchedule(schedule);
  }
}
