import { BadRequestException } from '@nestjs/common';

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
  constructor(users: unknown) {
    super({
      unavailableUsers: users,
    });
  }
}
