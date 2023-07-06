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

  it('should return order status', () => {
    const orderId = '12345';
    const progress = service.getOrderStatus(orderId);

    expect(progress).toBeDefined();
    expect(progress).toMatch(
      /주문 요청|주문 확정|취소 요청|취소 완료|취소 실패|배달 중|배달 완료/,
    );
  });

  it('should check if order is cancelable', () => {
    const orderId = '12345';

    jest.spyOn(service, 'getOrderStatus').mockReturnValue('주문 요청');
    const isCancelable = service.isOrderCancelable(orderId);
    expect(isCancelable).toBe(true);

    jest.spyOn(service, 'getOrderStatus').mockReturnValue('주문 확정');
    const isNotCancelable = service.isOrderCancelable(orderId);
    expect(isNotCancelable).toBe(false);
  });

  it('should cancel the order', () => {
    const orderId = '12345';

    jest.spyOn(service, 'isOrderCancelable').mockReturnValue(true);
    const isCancelled = service.cancelOrder(orderId);
    expect(isCancelled).toBe(true);

    jest.spyOn(service, 'isOrderCancelable').mockReturnValue(false);
    const isNotCancelled = service.cancelOrder(orderId);
    expect(isNotCancelled).toBe(false);
  const OrderStatus = {
    ORDER_REQUEST: 'order request',
    ORDER_CONFIRMED: 'order confirmed',
    ORDER_COMPLETED: 'order completed',
    ORDER_CANCEL_REQUEST: 'order cancel request',
    ORDER_CANCEL_COMPLETED: 'order cancel completed',
    ORDER_CANCEL_FAILED: 'order cancel failed',
    DELIVERY_PROGRESS: 'delivery progress',
    DELIVERY_COMPLETED: 'delivery completed',
  };

  const orderInfo = {
    id: 1,
    store_id: 1,
    dish_id: 1,
    user_id: 1,
    status: { name: null, timestamp: 0 },
  };

  describe('updateOrderStatus', () => {
    it('should be update order status and return "order confirmed"', async () => {
      expect(
        service.updateOrderStatus(orderInfo, OrderStatus.ORDER_CONFIRMED),
      ).toBe('order confirmed');
    });
    it('should be update order status and return "order confirmed"', async () => {
      expect(
        service.updateOrderStatus(orderInfo, OrderStatus.DELIVERY_PROGRESS),
      ).toBe('delivery progress');
    });
    it('should be update order status and return "order confirmed"', async () => {
      expect(
        service.updateOrderStatus(orderInfo, OrderStatus.ORDER_COMPLETED),
      ).toBe('order completed');
    });
  });

  describe('sendOrderAlarm', () => {
    it('should be return true', async () => {
      expect(service.sendOrderAlarm(orderInfo)).toBe(true);
    });
  });
});
