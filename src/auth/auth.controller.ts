import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from './user.dto';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @ApiOperation({
        summary: '登入',
    })
    @Post('login')
    async login(@Body() dto: UserDto): Promise<{accessToken: string}> {
        return await this.authService.login(dto);
    }
}
