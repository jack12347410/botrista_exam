import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from "class-validator";

export class CreateProductDto{
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    price: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsInt()
    @Min(0)
    stock: number;
}

export class UpdateProductDto{
    @ApiProperty()
    @IsOptional()
    @IsString()
    name: string;

    @ApiProperty()
    @IsOptional()
    @IsNumber()
    @Min(0)
    price: number;

    @ApiProperty()
    @IsOptional()
    @IsInt()
    @Min(0)
    stock: number;
}