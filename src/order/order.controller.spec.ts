import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';

describe('OrderController', () => {
  let controller: OrderController;
  let service: OrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [OrderService],
    }).compile();

    controller = module.get<OrderController>(OrderController);
    service = module.get<OrderService>(OrderService);
  });

  describe('getOrderStatus', () => {
    it('should return order status', () => {
      const orderId = '12345';
      const status = '주문 확정';

      jest.spyOn(service, 'getOrderStatus').mockReturnValue(status);

      const result = controller.getOrderStatus(orderId);
      expect(result).toBe(status);
    });
  });

  describe('cancelOrder', () => {
    it('should cancel the order when it is cancellable', () => {
      const orderId = '12345';

      jest.spyOn(service, 'cancelOrder').mockReturnValue(true);

      const result = controller.cancelOrder(orderId);
      expect(result).toBe('주문이 취소되었습니다.');
    });

    it('should return error message if order cancellation fails', () => {
      const orderId = '12345';

      jest.spyOn(service, 'cancelOrder').mockReturnValue(false);

      const result = controller.cancelOrder(orderId);
      expect(result).toBe('주문을 취소할 수 없습니다.');
    });
  });

  describe('getOrderHistory', () => {
    it('should return order history for a user', () => {
      const userId = '12345';
      const orderHistory = ['주문 내역 1', '주문 내역 2'];

      jest.spyOn(service, 'getOrderHistory').mockReturnValue(orderHistory);

      const result = controller.getOrderHistory(userId);
      expect(result).toEqual(orderHistory);
    });
  });

  describe('updateOrderStatus', () => {
    const orderStatus = 'completed';
    it('should update order status and return true', async () => {
      const orderId = 12345;
      const result = await controller.updateOrderStatus(orderId, orderStatus);
      expect(result).toBe(true);
    });

    it('should update order status and return false', async () => {
      const orderId = 123;
      const result = await controller.updateOrderStatus(orderId, orderStatus);
      expect(result).toBe(false);
    });
  });
});
