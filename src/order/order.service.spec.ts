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

  const orderInfo = {
    id: 1,
    store_id: 1,
    dish_id: 1,
    user_id: 1,
    status: { name: 'order request' },
  };
  const updateOrderInfo = {
    id: 1,
    store_id: 1,
    dish_id: 1,
    user_id: 1,
    status: { name: 'order confirmed' },
  };
  describe('updateOrderStatus', () => {
    it('should be return true', async () => {
      expect(service.updateOrderStatus(orderInfo, updateOrderInfo)).toBe(true);
    });
  });
});
