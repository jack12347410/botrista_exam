import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { AuthModule } from '../auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from './product.entity';

@Module({
  imports:[
    MongooseModule.forFeature([{ name: 'product', schema: ProductSchema }])
    ,AuthModule],
  providers: [ProductService],
  controllers: [ProductController],
})
export class ProductModule {}
