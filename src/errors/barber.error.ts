import { BadRequestException } from '@nestjs/common';

export class BarberNotFoundError extends BadRequestException {
  constructor() {
    super('Barber not found');
  }
}

export class BarberServicesNotFound extends BadRequestException {
  constructor() {
    super('Some or many services do not exist');
  }
}

export class BarberExistsError extends BadRequestException {
  constructor() {
    super('This barber already exists');
  }
}
