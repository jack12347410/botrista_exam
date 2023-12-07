import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { RolesGuard } from '../auth/roles.guard';
import { RoleEnum } from '../auth/roles.enum';
import { Roles } from '../auth/roles.decorator';
import { CreateOrderDto } from './order.dto';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiBody} from '@nestjs/swagger';

@ApiTags('order')
@ApiBearerAuth()
@Controller('order')
@UseGuards(JwtAuthGuard, RolesGuard)
export class OrderController {
    constructor(private readonly orderService: OrderService){}

    @ApiOperation({
        summary: 'order list',
    })
    @Get()
    @Roles(RoleEnum.Manager, RoleEnum.Customer)
    async findAll(@Req() req: Request):Promise<any> {
        if(req['user']['roleType'] === Number(RoleEnum.Customer)){
            return await this.orderService.findOrder(req['user']['_id']);
        }else{
            return await this.orderService.findOrder(null);
        }
    }

    @ApiOperation({
        summary: 'create order',
    })
    @Post()
    @Roles(RoleEnum.Customer)
    async Create(@Body() orderDto: CreateOrderDto, @Req() req: Request): Promise<any> {
        return await this.orderService.CreateOrder(req['user']['_id'], orderDto);
    }
}
