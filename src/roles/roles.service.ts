import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RolesEntity } from './roles.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RolesService {
    constructor(
        @InjectRepository(RolesEntity)
        private readonly rolesRepository: Repository<RolesEntity>
    ){}

    async create(role: RolesEntity): Promise<{message:string, roleId: string}> {
        await this.rolesRepository.save(role);
        return {message: "Rol Creado con exito", roleId: role.id}
    }

    async findAll(): Promise<RolesEntity[]> {
        return await this.rolesRepository.find({ relations: ["users"]});
    }
}
