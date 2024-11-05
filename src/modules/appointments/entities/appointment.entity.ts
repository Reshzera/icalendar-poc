import {
  Appointment as PrismaAppointment,
  User as PrismaUser,
} from '@prisma/client';
import { User } from '../../user/entities/user.entity';

type AppointmentFromPrisma = PrismaAppointment & {
  users: PrismaUser[];
};

export interface AppointmentProps {
  id?: string;
  start: Date;
  end: Date;
  users: User[];
}

export class Appointment {
  constructor(private _props: AppointmentProps) {}

  get id(): string | undefined {
    return this._props.id;
  }

  get start(): Date {
    return this._props.start;
  }

  get end(): Date {
    return this._props.end;
  }

  get users(): User[] {
    return this._props.users;
  }

  set start(start: Date) {
    this._props.start = start;
  }

  set end(end: Date) {
    this._props.end = end;
  }

  set users(users: User[]) {
    this._props.users = users;
  }

  public update(appointment: Partial<AppointmentProps>): void {
    this.start = appointment.start ?? this.start;
    this.end = appointment.end ?? this.end;
    this.users = appointment.users ?? this.users;
  }

  static PrismaToEntity(prismaAppointment: AppointmentFromPrisma): Appointment {
    if (!prismaAppointment) return null;
    return new Appointment({
      id: prismaAppointment.id,
      start: prismaAppointment.start,
      end: prismaAppointment.end,
      users: prismaAppointment?.users?.map((user) => User.PrismaToEntity(user)),
    });
  }

  static EntityToApi(appointment: Appointment) {
    return {
      id: appointment.id,
      start: appointment.start,
      end: appointment.end,
      users: appointment.users.map((user) => User.EntityToApi(user)),
    };
  }
}
