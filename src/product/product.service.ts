import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ModifyResult, Types } from 'mongoose';
import { Product } from './product.entity';
import { CreateProductDto, UpdateProductDto } from './product.dto';
import { FilterEnum } from './filter.enum';
import { Order } from '../order/order.entity';

@Injectable()
export class ProductService {
    constructor(
        @InjectModel('product') private readonly productModel: Model<Product>
        ,@InjectModel('order') private readonly orderModel: Model<Order>
    ){}

    async createProduct(dto: CreateProductDto):Promise<any> {
        try{
            return await this.productModel.create(dto);
        }catch(error){
            console.log(error);
            throw new BadRequestException(`create product failed, ${error}`); 
        }   
    }

    async updateProduct(id: string, dto: UpdateProductDto): Promise<Product> {
        try{
            const update = await this.productModel.findByIdAndUpdate(id, dto, { new: true });
            if(update === null) {
                throw new BadRequestException('cannot find this Product');
            }
            return update;
        }catch(error){
            console.log(error);
            throw new BadRequestException(`update product failed, ${error}`); 
        }
    }

    async deleteProduct(id: string): Promise<any> {
        try{
            const count = await this.orderModel.countDocuments({'products.productId': new Types.ObjectId(id)});
            if(count > 0 ) {
                throw new BadRequestException('this product is in some order')
            }
            return await this.productModel.findByIdAndDelete(id);
        }catch(error){
            console.log(error);
            throw new BadRequestException(`delete product failed, ${error}`); 
        }  
    }

    async findProducts(price: number, priceFilterType:number, stock: number, stockFilterType:number):Promise<any> {
        try{
            const query = {};
            if(price !== undefined){
                query['price'] = {};
                query['price'][this.getFilter(priceFilterType)] = price;
            }
            if(stock !== undefined){
                query['stock'] = {};
                query['stock'][this.getFilter(stockFilterType)] = stock;
            }
            return await this.productModel.find(query);
        }catch(error){
            console.log(error);
            throw new BadRequestException(`find products failed, ${error}`); 
        }
    }

    private getFilter(filterType: number): string{
        switch(Number(filterType)){
            case Number(FilterEnum.GreaterThan):
                return "$gt";
            case Number(FilterEnum.LessThan):
                return "$lt";
            default:
                return "$gt";
        }
    }
}
