import { Controller } from '@nestjs/common';
import { RolesService } from './roles.service';
import { JwtService } from '@nestjs/jwt';

@Controller('roles')
export class RolesController {
    constructor(
        private readonly rolesService: RolesService,
        private jwtService: JwtService
    ) {}
}