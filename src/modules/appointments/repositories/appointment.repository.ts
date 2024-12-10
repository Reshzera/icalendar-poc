import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infra/Prisma/prisma.service';
import { Appointment } from '../entities/appointment.entity';
import { User } from '../../user/entities/user.entity';

@Injectable()
export class AppointmentRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(userId: string) {
    const appointments = await this.prisma.appointment.findMany({
      where: {
        users: {
          some: {
            id: userId,
          },
        },
      },
      include: {
        users: true,
      },
    });
    return appointments.map(Appointment.PrismaToEntity);
  }

  async findById(id: string) {
    const appointment = await this.prisma.appointment.findUnique({
      where: {
        id,
      },
      include: {
        users: true,
      },
    });
    return Appointment.PrismaToEntity(appointment);
  }

  async create(appointment: Appointment) {
    const createdAppointment = await this.prisma.appointment.create({
      data: {
        start: appointment.start,
        end: appointment.end,
        users: {
          connect: appointment.users.map((user) => ({
            id: user.id,
          })),
        },
      },
      include: {
        users: true,
      },
    });
    return Appointment.PrismaToEntity(createdAppointment);
  }

  async update(appointment: Appointment) {
    const updatedAppointment = await this.prisma.appointment.update({
      where: {
        id: appointment.id,
      },
      data: {
        start: appointment.start,
        end: appointment.end,
        users: {
          set: appointment.users.map((user) => ({
            id: user.id,
          })),
        },
      },
      include: {
        users: true,
      },
    });
    return Appointment.PrismaToEntity(updatedAppointment);
  }

  async delete(id: string) {
    const deletedAppointment = await this.prisma.appointment.delete({
      where: {
        id,
      },
      include: {
        users: true,
      },
    });
    return Appointment.PrismaToEntity(deletedAppointment);
  }

  async checkAvailability(userId: string, start: Date, end: Date) {
    const appointments = await this.prisma.appointment.findMany({
      where: {
        users: {
          some: {
            id: userId,
          },
        },
        AND: [{ start: { lte: end } }, { end: { gte: start } }],
      },
    });

    return appointments.length === 0;
  }

  async getManyUsers(users: string[]) {
    const usersExist = await this.prisma.user.findMany({
      where: {
        id: {
          in: users,
        },
      },
    });
    return usersExist.map((user) => User.PrismaToEntity(user));
  }
}
