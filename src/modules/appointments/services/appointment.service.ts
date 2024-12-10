import { Injectable } from '@nestjs/common';
import {
  AppointmentNotFoundError,
  AppointmentUserNotAvailable,
  AppointmentUsersNotFound,
} from '../../../errors/appointment.error';
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

  async create(appointmentDto: CreateAppointmentDto, user: User) {
    const usersToValidate = [...appointmentDto.users, user.id];

    const users = await this.getAllValidUsers(
      usersToValidate,
      appointmentDto.start,
      appointmentDto.end,
    );

    const appointment = new Appointment({ ...appointmentDto, users });

    const newAppointment = await this.appointmentRepository.create(appointment);

    return Appointment.EntityToApi(newAppointment);
  }

  async update(id: string, appointmentDto: UpdateAppointmentDto, user: User) {
    const appointment = await this.appointmentRepository.findById(id);

    if (!appointment) {
      throw new AppointmentNotFoundError();
    }

    const usersToValidate = appointmentDto.users
      ? [...appointmentDto.users, user.id]
      : [...appointment.users.map((user) => user.id), user.id];

    const users = await this.getAllValidUsers(
      usersToValidate,
      appointmentDto.start ?? appointment.start,
      appointmentDto.end ?? appointment.end,
    );

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

  private async getAllValidUsers(users: string[], start: Date, end: Date) {
    const allUsersExist = await this.appointmentRepository.getManyUsers(users);
    const usersUnavailable: User[] = [];

    if (allUsersExist.length !== users.length) {
      throw new AppointmentUsersNotFound();
    }

    for (const user of allUsersExist) {
      const isUserAvailable =
        await this.appointmentRepository.checkAvailability(user.id, start, end);

      if (!isUserAvailable) {
        usersUnavailable.push(user);
      }
    }

    if (usersUnavailable.length > 0) {
      throw new AppointmentUserNotAvailable(usersUnavailable);
    }

    return allUsersExist;
  }
}
