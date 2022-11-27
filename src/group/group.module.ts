import { Module } from '@nestjs/common';
import { GroupResolver } from './group.resolver';
import { GroupService } from './group.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Group, GroupSchema } from 'src/entities';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Group.name, schema: GroupSchema }]),
  ],
  providers: [GroupResolver, GroupService],
})
export class GroupModule {}
