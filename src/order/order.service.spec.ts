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
  const orderComfirmed = {
    id: 1,
    store_id: 1,
    dish_id: 1,
    user_id: 1,
    status: { name: 'order confirmed' },
  };
  const orderCompleted = {
    id: 1,
    store_id: 1,
    dish_id: 1,
    user_id: 1,
    status: { name: 'order completed' },
  };
  describe('updateOrderStatus', () => {
    it('should be return order confirmed', async () => {
      expect(service.updateOrderStatus(orderInfo, orderComfirmed)).toBe(
        'order confirmed',
      );
    });
    it('should be return order completed', async () => {
      expect(service.updateOrderStatus(orderInfo, orderCompleted)).toBe(
        'order completed',
      );
    });
  });

  describe('sendOrderAlarm', () => {
    it('should be return true', async () => {
      expect(service.sendOrderAlarm(orderInfo)).toBe(true);
    });
  });
});
