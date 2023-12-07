import { Types } from "mongoose";
import { ArrayMinSize, IsArray, IsInt, IsNotEmpty, Min, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

export class CreateOrderDto{
    @IsNotEmpty()
    @IsArray()
    @ArrayMinSize(1)
    @Type(()=> CreateOrderProductDto)
    @ValidateNested({ each: true })//validate each element of the array
    products: CreateOrderProductDto[];
}

export class CreateOrderProductDto{
    @IsNotEmpty()
    productId: Types.ObjectId; 

    @IsNotEmpty()
    @IsInt()
    @Min(1)
    quantity: number 
}