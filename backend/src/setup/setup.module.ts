import { Module } from '@nestjs/common';
import { SetupService } from './setup.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [SetupService, PrismaService],
})
export class SetupModule {}
