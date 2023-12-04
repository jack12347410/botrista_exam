import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../auth/roles.decorator';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { RolesGuard } from '../auth/roles.guard';
import { RoleEnum } from '../auth/roles.enum';

@Controller('product')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProductController {
    @Get('test')
    @Roles(RoleEnum.Customer)
    Test(): string{
        return "test";
    }

    @Get('test2')
    Test2(): string{
        return "test";
    }

}
