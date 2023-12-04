import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ModifyResult, Types } from 'mongoose';
import { Product } from './product.entity';
import { ProductDto } from './product.dto';

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

    async FindProducts():Promise<any> {
        try{
            return await this.productModel.find();
        }catch(error){
            console.log(error);
            throw new BadRequestException(`find products failed`); 
        }
    }
}
