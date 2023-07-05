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

  describe('getOrderStatus', () => {
    it('should return order status', () => {
      const orderId = '12345';
      const progress = service.getOrderStatus(orderId);

      expect(progress).toBeDefined();
      expect(progress).toMatch(
        /주문 요청|주문 확정|취소 요청|취소 완료|취소 실패|배달 중|배달 완료/,
      );
    });
  });

  describe('isOrderCancelable', () => {
    it('should return true if order status is "주문 요청"', () => {
      const orderId = '12345';
      // Set up mock behavior for getOrderStatus method
      jest.spyOn(service, 'getOrderStatus').mockReturnValue('주문 요청');

      const isCancelable = service.isOrderCancelable(orderId);
      expect(isCancelable).toBe(true);
    });

    it('should return false if order status is not "주문 요청"', () => {
      const orderId = '12345';
      // Set up mock behavior for getOrderStatus method
      jest.spyOn(service, 'getOrderStatus').mockReturnValue('주문 확정');

      const isCancelable = service.isOrderCancelable(orderId);
      expect(isCancelable).toBe(false);
    });
  });

  describe('cancelOrder', () => {
    it('should return true if order cancellation is successful', () => {
      const orderId = '12345';
      // Set up mock behavior for isOrderCancelable method
      jest.spyOn(service, 'isOrderCancelable').mockReturnValue(true);

      const isCancelled = service.cancelOrder(orderId);
      expect(isCancelled).toBe(true);
    });

    it('should return false if order cancellation fails', () => {
      const orderId = '12345';
      // Set up mock behavior for isOrderCancelable method
      jest.spyOn(service, 'isOrderCancelable').mockReturnValue(false);

      const isCancelled = service.cancelOrder(orderId);
      expect(isCancelled).toBe(false);
    });
  });

  describe('getOrderHistory', () => {
    it('should return order history', () => {
      const userId = '12345';
      const orderHistory = service.getOrderHistory(userId);

      expect(orderHistory).toBeDefined();
      expect(orderHistory.length).toBeGreaterThan(0);
    });
  });
});
