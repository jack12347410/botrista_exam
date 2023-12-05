import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from 'mongoose';
import { Product } from "../product/product.entity";
import { User } from "../auth/user.entity";

@Schema()
export class Order extends Document{
    _id: Types.ObjectId;

    @Prop({required: true, ref: "user"})
    customerId: User;

    @Prop({ref: "product"})
    products: { product: Product; quantity: number }[];
}

export const OrderSchema = SchemaFactory.createForClass(Order);