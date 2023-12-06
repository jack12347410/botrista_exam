import { Types } from "mongoose";
import { User } from "../auth/user.entity";
import { Product } from "../product/product.entity";

export class OrderDto{
    products: { productId: Types.ObjectId; quantity: number }[];
}