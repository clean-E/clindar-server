import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User } from 'src/entities';
import { Schedule, ScheduleSchema } from 'src/entities/schedule.entity';
import { ScheduleResolver } from './schedule.resolver';
import { ScheduleService } from './schedule.service';
import { UserSchema } from 'src/entities/user.entity';

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
    ]),
  ],
  providers: [ScheduleResolver, ScheduleService],
})
export class ScheduleModule {}
