import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';

describe('OrderController', () => {
  let controller: OrderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [OrderService],
    }).compile();

    controller = module.get<OrderController>(OrderController);
  });

  it('should return order status', () => {
    const orderId = '12345';
    const progress = '배달 중';

    jest
      .spyOn(controller['orderService'], 'getOrderStatus')
      .mockReturnValue(progress);

    const result = controller.getOrderProgress(orderId);
    expect(result).toBe(progress);
  });
});
