import { Types } from "mongoose";
import { ArrayMinSize, IsArray, IsInt, IsNotEmpty, IsString, Min, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

export class CreateOrderProductDto{
    @ApiProperty()
    @IsNotEmpty()
    productId: string; 

    @ApiProperty()
    @IsNotEmpty()
    @IsInt()
    @Min(1)
    quantity: number 
}

export class CreateOrderDto{
    @ApiProperty({
        type: CreateOrderProductDto,
        isArray: true,
        minItems: 1,
      })
    @IsNotEmpty()
    @IsArray()
    @ArrayMinSize(1)
    @Type(()=> CreateOrderProductDto)
    @ValidateNested({ each: true })//validate each element of the array
    products: CreateOrderProductDto[];
}

