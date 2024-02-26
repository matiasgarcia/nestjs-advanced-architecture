import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { Alarm } from '../../domain/alarm';
import { GetAlarmsQuery } from './get-alarms.query';
import { FindAlarmsRepository } from '../ports/find-alarms.repository';
import { AlarmReadModel } from '../../domain/read-models/alarm.read-model';

@QueryHandler(GetAlarmsQuery)
export class GetAlarmsQueryHandler
  implements IQueryHandler<GetAlarmsQuery, AlarmReadModel[]>
{
  private readonly logger = new Logger(GetAlarmsQueryHandler.name);

  constructor(private readonly alarmsRepository: FindAlarmsRepository) {}

  async execute(query: GetAlarmsQuery): Promise<AlarmReadModel[]> {
    return this.alarmsRepository.findAll();
  }
}
