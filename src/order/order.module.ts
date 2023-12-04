import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
  ],
  providers: [OrderService],
  controllers: [OrderController],
})
export class OrderModule {}
