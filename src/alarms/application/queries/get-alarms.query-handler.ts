import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { Alarm } from '../../domain/alarm';
import { GetAlarmsQuery } from './get-alarms.query';
import { AlarmRepository } from '../ports/alarm.repository';

@QueryHandler(GetAlarmsQuery)
export class GetAlarmsQueryHandler
  implements IQueryHandler<GetAlarmsQuery, Alarm[]>
{
  private readonly logger = new Logger(GetAlarmsQueryHandler.name);

  constructor(private readonly alarmsRepository: AlarmRepository) {}

  async execute(query: GetAlarmsQuery): Promise<Alarm[]> {
    return this.alarmsRepository.findAll();
  }
}
