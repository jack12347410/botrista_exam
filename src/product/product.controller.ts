import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard, Type } from '@nestjs/passport';
import { Roles } from '../auth/roles.decorator';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { RolesGuard } from '../auth/roles.guard';
import { RoleEnum } from '../auth/roles.enum';
import { Product } from './product.entity';
import { ProductDto } from './product.dto';
import { ProductService } from './product.service';
import { Types } from 'mongoose';

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService){}

    @Get()
    async find():Promise<any> {
        return await this.productService.FindProducts();
    }
    
    @Post()
    @Roles(RoleEnum.Manager)
    @UseGuards(JwtAuthGuard, RolesGuard)
    async Create(@Body() product:ProductDto):Promise<any> {
        return await this.productService.CreateProduct(product);
    }

    @Put(':id')    
    @Roles(RoleEnum.Manager)
    @UseGuards(JwtAuthGuard, RolesGuard)
    async Update(@Param('id') id:string, @Body() updateData: ProductDto): Promise<any> {
        return await this.productService.UpdateProduct(id, updateData);
    }

    @Delete(':id')
    @Roles(RoleEnum.Manager)
    @UseGuards(JwtAuthGuard, RolesGuard)
    async Delete(@Param('id') id: string) : Promise<any> {
        return await this.productService.DeleteProduct(id);
    }

}
