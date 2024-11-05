import { BadRequestException } from '@nestjs/common';

export class ClientNotFoundError extends BadRequestException {
  constructor() {
    super('Client not found');
  }
}

export class ClientExistsError extends BadRequestException {
  constructor() {
    super('This Client already exists');
  }
}
