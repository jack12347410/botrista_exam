import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { OrderSchema } from './order.entity';
import { ProductSchema } from '../product/product.entity';

@Module({
  imports:[
    MongooseModule.forFeature([{ name: 'order', schema: OrderSchema }])
    ,MongooseModule.forFeature([{ name: 'product', schema: ProductSchema }])
    ,AuthModule
  ],
  providers: [OrderService],
  controllers: [OrderController],
})
export class OrderModule {}
