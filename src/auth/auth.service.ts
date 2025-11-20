import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async logIn(email: string, pass: string): Promise<{ access_token: string }> {
        const user = await this.usersService.findEmailWithPassword(email);
        const isMatch = await bcrypt.compare(pass, user.password);

        if (!isMatch) {
            throw new UnauthorizedException("Invalid credentials");
        }
        
        const payload = { sub: user.id, name: user.name, roles: user.roles? user.roles.map(r => r.role_name) : []};

        return { access_token: await this.jwtService.signAsync(payload) };
    }    
}
