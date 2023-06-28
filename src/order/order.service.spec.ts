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

  describe('updatePaymentStatus', () => {
    it('should update payment status to payment completed', () => {
      const result = service.updatePaymentStatus(1, 'completed');
      expect(result).toEqual({
        id: 1,
        paymentStatus: 'completed',
      });
    });

    it('should update payment status to payment failed', () => {
      const result = service.updatePaymentStatus(1, 'failed');
      expect(result).toEqual({
        id: 1,
        paymentStatus: 'failed',
      });
    });
  });
  
  describe('validatePaymentType', () => {
    it('should return true if payment type is valid', () => {
      const result = service.validatePaymentType('credit_card');
      expect(result).toEqual(true);
    });

    it('should return false if payment type is invalid', () => {
      const result = service.validatePaymentType('invalid');
      expect(result).toEqual(false);
    });
  });
});
