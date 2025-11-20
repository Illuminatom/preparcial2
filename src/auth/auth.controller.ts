import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersDto } from 'src/users/users.dto';
import { LogInDto } from 'src/users/login.dto';
import { UsersService } from 'src/users/users.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private usersService: UsersService
    ) {}

    @HttpCode(HttpStatus.CREATED)
    @Post('register')
    async register(@Body() userDto: UsersDto){
        const result = await this.usersService.create(userDto);
        return { message: "Usuario Registrado con Exito", userId: result.id}
    }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    logIn(@Body() logInDto: LogInDto){
        return this.authService.logIn(logInDto.email, logInDto.password)
    }
}
