import { Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { AppointmentsEntity } from './appointments.entity';
import { AppointmentsDto } from './appointments.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('appointments')
export class AppointmentsController {
    constructor( private readonly appointmentService: AppointmentsService ) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    create(appointment: AppointmentsDto) {
        return this.appointmentService.create(appointment)
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    findAll() {
        return this.appointmentService.findAll()
    }

    @UseGuards(JwtAuthGuard)
    @Delete(":id")
    deleteById(@Param("id") id: string) {
        return this.appointmentService.delete(id)
    }
}
