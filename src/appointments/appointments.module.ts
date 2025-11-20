import { Module } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { AppointmentsEntity } from './appointments.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([AppointmentsEntity])],
  providers: [AppointmentsService]
})
export class AppointmentsModule {
    
}
