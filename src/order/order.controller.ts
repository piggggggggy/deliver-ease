import { Controller, Get, Param, Patch } from '@nestjs/common';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get('/:orderId/progress')
  getOrderStatus(@Param('orderId') orderId: string): string {
    return this.orderService.getOrderStatus(orderId);
  }

  @Patch('/:orderId/cancel')
  cancelOrder(@Param('orderId') orderId: string): string {
    const isCancelled = this.orderService.cancelOrder(orderId);
    return isCancelled
      ? '주문이 취소되었습니다.'
      : '주문을 취소할 수 없습니다.';
  }
}
