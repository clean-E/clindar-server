import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Group, GroupSchema, User } from 'src/entities';
import { Schedule, ScheduleSchema } from 'src/entities/schedule.entity';
import { ScheduleResolver } from './schedule.resolver';
import { ScheduleService } from './schedule.service';
import { UserSchema } from 'src/entities/user.entity';
import { Records, RecordsSchema } from 'src/entities/records.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Schedule.name,
        schema: ScheduleSchema,
      },
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: Records.name,
        schema: RecordsSchema,
      },
      {
        name: Group.name,
        schema: GroupSchema,
      },
    ]),
  ],
  providers: [ScheduleResolver, ScheduleService],
})
export class ScheduleModule {}
