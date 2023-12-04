import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from 'mongoose';

@Schema()
export class Product extends Document{
    _id: Types.ObjectId;

    @Prop({required: true, unique: true})
    name: string;

    @Prop({required: true})
    price: number;

    @Prop({required: true})
    stock: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);