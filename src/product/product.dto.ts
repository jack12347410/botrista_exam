import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from "class-validator";

export class CreateProductDto{
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    price: number;

    @IsNotEmpty()
    @IsInt()
    @Min(0)
    stock: number;
}

export class UpdateProductDto{
    @IsOptional()
    @IsString()
    name: string;

    @IsOptional()
    @IsNumber()
    @Min(0)
    price: number;

    @IsOptional()
    @IsInt()
    @Min(0)
    stock: number;
}