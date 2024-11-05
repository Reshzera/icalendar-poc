import { Injectable } from '@nestjs/common';
import { AppointmentNotFoundError } from '../../../errors/appointment.error';
import { CreateAppointmentDto } from '../dtos/appointment.create.dto';
import { UpdateAppointmentDto } from '../dtos/appointment.update.dto';
import { Appointment } from '../entities/appointment.entity';
import { AppointmentRepository } from '../repositories/appointment.repository';
import { User } from '../../user/entities/user.entity';

@Injectable()
export class AppointmentService {
  constructor(private appointmentRepository: AppointmentRepository) {}

  async findAll(userId: string) {
    const appointments = await this.appointmentRepository.findAll(userId);

    return {
      appointments: appointments.map(Appointment.EntityToApi),
    };
  }

  async findById(id: string) {
    const appointment = await this.appointmentRepository.findById(id);

    if (!appointment) {
      throw new AppointmentNotFoundError();
    }

    return Appointment.EntityToApi(appointment);
  }

  async create(appointmentDto: CreateAppointmentDto) {
    const users = appointmentDto.users.map((user) => new User({ id: user }));

    const appointment = new Appointment({ ...appointmentDto, users });

    const newAppointment = await this.appointmentRepository.create(appointment);

    return Appointment.EntityToApi(newAppointment);
  }

  async update(id: string, appointmentDto: UpdateAppointmentDto) {
    const appointment = await this.appointmentRepository.findById(id);

    if (!appointment) {
      throw new AppointmentNotFoundError();
    }

    const users = appointmentDto.users.map((user) => new User({ id: user }));

    appointment.update({ ...appointmentDto, users });

    const updatedAppointment =
      await this.appointmentRepository.update(appointment);

    return Appointment.EntityToApi(updatedAppointment);
  }

  async delete(id: string) {
    const appointment = await this.appointmentRepository.findById(id);

    if (!appointment) {
      throw new AppointmentNotFoundError();
    }

    await this.appointmentRepository.delete(id);

    return Appointment.EntityToApi(appointment);
  }
}
