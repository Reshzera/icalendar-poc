import { BadRequestException } from '@nestjs/common';

export class AppointmentNotFoundError extends BadRequestException {
  constructor() {
    super('Appointment not found');
  }
}
export class AppointmentServicesNotFound extends BadRequestException {
  constructor() {
    super('Some or many services do not exist for this barber');
  }
}

export class AppointmentExistsError extends BadRequestException {
  constructor() {
    super('This Barber is already booked at this time');
  }
}
