import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ScheduleModule } from './schedule/schedule.module';
import { GroupModule } from './group/group.module';
import { RecordModule } from './record/record.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    CommonModule,
    UserModule,
    ScheduleModule,
    GroupModule,
    RecordModule,
  ],
})
export class AppModule {}
