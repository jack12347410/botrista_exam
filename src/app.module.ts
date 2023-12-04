import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { DatabaseModule } from './database/database.module';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseInterceptor } from './response/response.interceptor';
import { Roles } from './auth/roles.decorator';

@Module({
  imports: [AuthModule, ProductModule, OrderModule, DatabaseModule],
  controllers: [],
  providers: [{
    provide: APP_INTERCEPTOR,
    useClass: ResponseInterceptor
  }],
})
export class AppModule {}
