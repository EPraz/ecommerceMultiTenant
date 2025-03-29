import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma/prisma.service';
import { SetupModule } from './setup/setup.module';

@Module({
  imports: [AuthModule, SetupModule],
  controllers: [AppController],
  providers: [PrismaService],
})
export class AppModule {}
