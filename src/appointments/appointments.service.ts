import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppointmentsEntity } from './appointments.entity';
import { Repository } from 'typeorm';
import { AppointmentsDto } from './appointments.dto';
import { UsersService } from 'src/users/users.service';
import { UsersEntity } from 'src/users/users.entity';

@Injectable()
export class AppointmentsService {
    constructor(
        @InjectRepository(AppointmentsEntity)
        private readonly appointmentsRepository: Repository<AppointmentsEntity>,
        
        @InjectRepository(UsersService)
        private readonly usersRepository: Repository<UsersEntity>
    ) {}


    async create(data: AppointmentsDto): Promise<AppointmentsEntity> {
        const user = this.appointmentsRepository.create(data);
        return await this.appointmentsRepository.save(user);
    }

    async findAllPatient(idPatient: string): Promise<AppointmentsEntity[]> {
        const patient = await this.usersRepository.findOne({ where: {id: idPatient}})
        if(!patient)
            throw new Error("Patient not found")

        return await this.appointmentsRepository.find({ where: {patient: patient}, relations: ["patient", "doctor"]});
    }

    async findAllDoctor(idDoctor: string): Promise<AppointmentsEntity[]> {
        const doctor = await this.usersRepository.findOne({ where: {id: idDoctor}})
        if(!doctor)
            throw new Error("Doctor not found")

        return await this.appointmentsRepository.find({ where: {doctor: doctor}, relations: ["patient", "doctor"]});
    }

    async findAll(): Promise<AppointmentsEntity[]> {
        return await this.appointmentsRepository.find({ relations: ["patient", "doctor"]});
    }

    async delete(id: string) {
        const existingAppointment = await this.appointmentsRepository.findOne( {where: {id} })
        if(!existingAppointment)
            throw Error("Appointment not found")

        await this.appointmentsRepository.delete({ id: existingAppointment.id })
    }
}
