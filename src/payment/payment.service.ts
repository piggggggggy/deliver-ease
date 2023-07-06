import { Injectable } from '@nestjs/common';

@Injectable()
export class PaymentService {
  validatePaymentType(paymentType: string): boolean {
    return paymentType === 'credit card';
  }
  updatePaymentStatus(orderId: number, paymentStatus: string): any {
    return {
      id: orderId,
      paymentStatus,
    };
  }
}
