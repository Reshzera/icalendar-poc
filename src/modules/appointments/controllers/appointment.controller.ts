import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { AppointmentService } from '../services/appointment.service';
import { CreateAppointmentDto } from '../dtos/appointment.create.dto';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import { UpdateAppointmentDto } from '../dtos/appointment.update.dto';
import { User } from '../../user/entities/user.entity';

@Controller({
  path: 'appointment',
})
export class AppointmentController {
  constructor(private appointmentService: AppointmentService) {}

  @Get('/all')
  async getAppointments(@CurrentUser() user) {
    return await this.appointmentService.findAll(user.id);
  }

  @Get(':id')
  async getAppointment(@Param('id') id: string) {
    return await this.appointmentService.findById(id);
  }

  @Post()
  async createAppointment(
    @Body() appointment: CreateAppointmentDto,
    @CurrentUser() user: User,
  ) {
    return await this.appointmentService.create(appointment, user);
  }

  @Patch(':id')
  async updateAppointment(
    @Param('id') id: string,
    @Body() appointment: UpdateAppointmentDto,
  ) {
    return await this.appointmentService.update(id, appointment);
  }

  @Delete(':id')
  async deleteAppointment(@Param('id') id: string) {
    return await this.appointmentService.delete(id);
  }
}
