import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { AlarmEntity } from './entities/alarm.entity';
import { OrmCreateAlarmRepository } from './repositories/create-alarm.repository';
import { AlarmItemEntity } from './entities/alarm-item.entity';
import { CreateAlarmRepository } from '../../../application/ports/create-alarm.repository';
import { FindAlarmsRepository } from '../../../application/ports/find-alarms.repository';
import { OrmFindAlarmsRepository } from './repositories/find-alarms.repository';
import { UpsertMaterializedAlarmRepository } from '../../../application/ports/upsert-materialized-alarm.repository';
import {
  MaterializedAlarmView,
  MaterializedAlarmViewSchema,
} from './schemas/materialized-alarm-view.schema';

@Module({
  imports: [
    TypeOrmModule.forFeature([AlarmEntity, AlarmItemEntity]),
    MongooseModule.forFeature([
      { name: MaterializedAlarmView.name, schema: MaterializedAlarmViewSchema },
    ]),
  ],
  providers: [
    {
      provide: CreateAlarmRepository,
      useClass: OrmCreateAlarmRepository,
    },
    {
      provide: FindAlarmsRepository,
      useClass: OrmFindAlarmsRepository,
    },
    {
      provide: UpsertMaterializedAlarmRepository,
      useClass: OrmFindAlarmsRepository,
    },
  ],
  exports: [
    CreateAlarmRepository,
    FindAlarmsRepository,
    UpsertMaterializedAlarmRepository,
  ],
})
export class OrmAlarmPersistenceModule {}
