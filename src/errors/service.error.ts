import { BadRequestException } from '@nestjs/common';

export class ServiceNotFoundError extends BadRequestException {
  constructor() {
    super('Service not found');
  }
}

export class ServiceExistsError extends BadRequestException {
  constructor() {
    super('This Service already exists');
  }
}
