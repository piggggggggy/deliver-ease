import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from './order.service';

describe('OrderService', () => {
  let service: OrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderService],
    }).compile();

    service = module.get<OrderService>(OrderService);
  });

  it('should return order progress', () => {
    const orderId = '12345';
    const progress = service.getOrderStatus(orderId);

    expect(progress).toBeDefined();
    expect(progress).toMatch(
      /주문 요청|주문 확정|취소 요청|취소 완료|취소 실패|배달 중|배달 완료/,
    );
  });
});
