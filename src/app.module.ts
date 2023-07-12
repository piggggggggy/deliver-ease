import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { OrderModule } from './order/order.module';
import { ReviewModule } from './review/review.module';
import { PaymentModule } from './payment/payment.module';
import { StoreModule } from './store/store.module';
import { CartModule } from './cart/cart.module';

@Module({
  imports: [
    UserModule,
    OrderModule,
    ReviewModule,
    PaymentModule,
    StoreModule,
    CartModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
