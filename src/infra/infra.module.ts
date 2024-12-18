import { Module } from '@nestjs/common';
import { PrismaService } from './Prisma/prisma.service';

@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class InfraModule {}
