import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { AuthGuard, Type } from '@nestjs/passport';
import { Roles } from '../auth/roles.decorator';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { RolesGuard } from '../auth/roles.guard';
import { RoleEnum } from '../auth/roles.enum';
import { Product } from './product.entity';
import { CreateProductDto, UpdateProductDto } from './product.dto';
import { ProductService } from './product.service';
import { Types } from 'mongoose';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('product')
@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService){}

    @ApiOperation({
        summary: 'product list',
    })
    @ApiQuery({
        name: 'price',
        required: false,
        description: 'price(option)'
    })
    @ApiQuery({
        name: 'pft',
        required: false,
        description: 'price filter type(default:0)(0: greater, 1: less)'
    })
    @ApiQuery({
        name: 'stock',
        required: false,
        description: 'stock(option)'
    })
    @ApiQuery({
        name: 'sft',
        required: false,
        description: 'stock filter tpye(default: 0)(0: greater, 1: less)'
    })
    @Get()
    async find(@Query('price') price: number
            , @Query('pft') pft: number
            , @Query('stock') stock: number
            , @Query('sft') sft: number):Promise<any> {
        return await this.productService.findProducts(price, pft, stock, sft);
    }
    
    @ApiOperation({
        summary: 'create product',
    })
    @ApiBearerAuth()
    @Post()
    @Roles(RoleEnum.Manager)
    @UseGuards(JwtAuthGuard, RolesGuard)
    async Create(@Body() dto:CreateProductDto):Promise<any> {
        return await this.productService.createProduct(dto);
    }

    @ApiOperation({
        summary: 'Edit product',
    })
    @ApiBearerAuth()
    @Put(':id')    
    @Roles(RoleEnum.Manager)
    @UseGuards(JwtAuthGuard, RolesGuard)
    async Update(@Param('id') id:string, @Body() updateData: UpdateProductDto): Promise<any> {
        return await this.productService.updateProduct(id, updateData);
    }

    @ApiOperation({
        summary: 'delete product',
    })
    @ApiBearerAuth()
    @Delete(':id')
    @Roles(RoleEnum.Manager)
    @UseGuards(JwtAuthGuard, RolesGuard)
    async Delete(@Param('id') id: string) : Promise<any> {
        return await this.productService.deleteProduct(id);
    }

}
