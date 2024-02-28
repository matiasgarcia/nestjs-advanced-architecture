import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
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
        new CreateAlarmCommand(
          createAlarmDto.name,
          createAlarmDto.severity,
          createAlarmDto.triggeredAt,
          createAlarmDto.items,
        ),
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

  @Patch(':id/acknowledge')
  acknowledge(@Param('id') id: string) {
    return this.alarmsService.acknowledge(id);
  }
}
