import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ModifyResult, Types } from 'mongoose';
import { Product } from './product.entity';
import { ProductDto } from './product.dto';
import { FilterEnum } from './filter.enum';

@Injectable()
export class ProductService {
    constructor(
        @InjectModel('product') private readonly productModel: Model<Product>
    ){}

    async CreateProduct(dto: ProductDto):Promise<any> {
        try{
            return await this.productModel.create(dto);
        }catch(error){
            console.log(error);
            throw new BadRequestException(`create product failed`); 
        }   
    }

    async UpdateProduct(id: string, dto: ProductDto): Promise<Product> {
        try{
            return await this.productModel.findByIdAndUpdate(id, dto, { new: true });
        }catch(error){
            console.log(error);
            throw new BadRequestException(`update product failed`); 
        }
    }

    async DeleteProduct(id: string): Promise<any> {
        try{
            return await this.productModel.findByIdAndDelete(id);
        }catch(error){
            console.log(error);
            throw new BadRequestException(`delete product failed`); 
        }  
    }

    async FindProducts(price: number, priceFilterType:number, stock: number, stockFilterType:number):Promise<any> {
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
            console.log(query);
            return await this.productModel.find(query);
        }catch(error){
            console.log(error);
            throw new BadRequestException(`find products failed`); 
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
