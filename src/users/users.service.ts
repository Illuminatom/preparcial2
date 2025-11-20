import { BadRequestException, ConflictException, Get, Injectable, UnauthorizedException, UseGuards, Request } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from './users.entity';
import { Repository } from 'typeorm';
import { UsersDto } from './users.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UsersEntity)
        private readonly usersRepository: Repository<UsersEntity>
    ){}

    async create(data: UsersDto): Promise<UsersEntity> {
        const existingUser = await this.usersRepository.findOne({ where: {email: data.email }});
        if (existingUser)
            throw new ConflictException("Email ya registrado")

        const user = this.usersRepository.create(data);

        return await this.usersRepository.save(user);
    }

    async findAll(): Promise<UsersEntity[]> {
        return await this.usersRepository.find({ relations: ["roles"]});
    }

    async findEmailWithPassword(email: string): Promise<UsersEntity> {
        const user = await this.usersRepository.findOne({ where: { email }, select: ["id", "email", "password", "name", "is_active"]});

        if(!user)
            throw new UnauthorizedException("User not found")

        return user
    }

    async findById(id: string) {
        return await this.usersRepository.findOne({ where: { id }, select: ["id", "email", "name", "phone", "roles"] });
    }
}
