import { BadRequestException } from '@nestjs/common';
import { User } from '../modules/user/entities/user.entity';

export class AppointmentNotFoundError extends BadRequestException {
  constructor() {
    super('Appointment not found');
  }
}
export class AppointmentExistsError extends BadRequestException {
  constructor() {
    super('This Barber is already booked at this time');
  }
}

export class AppointmentUsersNotFound extends BadRequestException {
  constructor() {
    super('Some or many users were not found');
  }
}

export class AppointmentUserNotAvailable extends BadRequestException {
  constructor(users: User[]) {
    super({
      unavailableUsers: users.map((user) => User.EntityToApi(user)),
    });
  }
}
