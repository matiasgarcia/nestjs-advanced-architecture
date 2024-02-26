import { Body, Controller, Get, Post } from '@nestjs/common';
import { AlarmsService } from '../../application/alarms.service';
import { CreateAlarmCommand } from '../../application/commands/create-alarm.command';
import { CreateAlarmDto } from './dto/create-alarm.dto';

@Controller('alarms')
export class AlarmsController {
  constructor(private readonly alarmsService: AlarmsService) {}

  @Post()
  async create(@Body() createAlarmDto: CreateAlarmDto) {
    try {
      const alarm = await this.alarmsService.create(
        new CreateAlarmCommand(createAlarmDto.name, createAlarmDto.severity),
      );
      return alarm;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  @Get()
  findAll() {
    try {
      return this.alarmsService.findAll();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
