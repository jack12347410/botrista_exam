import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { AuthModule } from '../auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from './product.entity';
import { OrderSchema } from '../order/order.entity';

@Module({
  imports:[
    MongooseModule.forFeature([{ name: 'product', schema: ProductSchema }])
    ,MongooseModule.forFeature([{ name: 'order', schema: OrderSchema }])
    ,AuthModule],
  providers: [ProductService],
  controllers: [ProductController],
})
export class ProductModule {}
