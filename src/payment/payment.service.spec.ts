import { Test, TestingModule } from '@nestjs/testing';
import { PaymentService } from './payment.service';

describe('PaymentService', () => {
  let service: PaymentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaymentService],
    }).compile();

    service = module.get<PaymentService>(PaymentService);
  });

  describe('validatePaymentType', () => {
    it('should be check payment type and return true', () => {
      expect(service.validatePaymentType('credit card')).toBe(true);
    });
    it('should be check payment type and return false', () => {
      expect(service.validatePaymentType('kakao pay')).toBe(false);
    });
  });

  describe('updatePaymentStatus', () => {
    it("should be update payment status to 'completed'", () => {
      expect(service.updatePaymentStatus(1, 'completed')).toEqual({
        id: 1,
        paymentStatus: 'completed',
      });
    });
  });
});
