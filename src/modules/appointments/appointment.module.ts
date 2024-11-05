import { Module } from '@nestjs/common';
import { AppointmentService } from './services/appointment.service';
import { InfraModule } from '../../infra/infra.module';
import { AppointmentRepository } from './repositories/appointment.repository';
import { AppointmentController } from './controllers/appointment.controller';

@Module({
  imports: [InfraModule],
  controllers: [AppointmentController],
  providers: [AppointmentService, AppointmentRepository],
  exports: [],
})
export class AppointmentModule {}
