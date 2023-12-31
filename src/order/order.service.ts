import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Order } from './order.entity';
import { Model, Types } from 'mongoose';
import { CreateOrderDto } from './order.dto';
import { Product } from '../product/product.entity';

@Injectable()
export class OrderService {
    constructor(
        @InjectModel('order') private readonly orderModel: Model<Order>,
        @InjectModel('product') private readonly productModel: Model<Product>
    ){}

    async CreateOrder(customerId: string, dto: CreateOrderDto):Promise<any> {
        try{
            const order = { 
                products: [],  
                createAt: new Date(),
                customerId: new Types.ObjectId(customerId),
            };
            const updateProductQuery = [];
            for(let i = 0; i < dto.products.length; i++){
                const product = await this.productModel.findById(dto.products[i].productId);
                if(product.stock < dto.products[i].quantity) {
                    throw new BadRequestException(`${product.name}'s stock is not enough.`);
                }
                order.products.push({
                    productId: new Types.ObjectId(dto.products[i].productId),
                    quantity: dto.products[i].quantity,
                });

                //更新庫存query
                updateProductQuery.push({
                    updateOne: {
                        filter: {_id: dto.products[i].productId}
                        ,update :{ $set:{stock: product.stock - dto.products[i].quantity}}
                    }
                });
            }

            const session = await this.productModel.db.startSession();
            const create = await session.withTransaction(async ()=>{
                const updateProduct = this.productModel.bulkWrite(updateProductQuery);
                const result = this.orderModel.create(order);
                await result;
                await updateProduct;
                return result;
            });

            return create;

        }catch(error){
            console.log(error);
            throw new BadRequestException(`create order failed, ${error}`); 
        } 
    }

    async findOrder(customerId: string):Promise<any> {
        try{
            const query = {};
            if(customerId !== null){
                query['customerId'] = new Types.ObjectId(customerId);
            }
            const orders = await this.orderModel.aggregate([
                { $match: query },
                { $unwind: '$products' },
                {
                    $lookup: {
                        from: 'products',
                        localField: 'products.productId',
                        foreignField: '_id',
                        as: 'productDetails'
                    }
                },
                { $unwind: '$productDetails' },
                {
                    $project: {
                        products:{
                            productId: '$productDetails._id',
                            name: '$productDetails.name',
                            price: '$productDetails.price',
                            quantity: '$products.quantity'
                        },
                        createAt: true
                    }
                },
                {
                    $group:{
                        _id: '$_id',
                        products: {$push: '$products'},
                        createAt: { $first: '$createAt'}
                    }
                }
            ]);

            return orders;

        }catch(error){
            console.log(error);
            throw new NotFoundException(); 
        }
    }
}
