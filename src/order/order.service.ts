import { Injectable } from '@nestjs/common';

@Injectable()
export class OrderService {
  getOrderStatus(orderId: string): string {
    // Todo 데이터베이스나 외부 시스템에서 주문 진행 상황을 조회하는 로직을 구현해야 합니다.
    const statuses = [
      '주문 요청',
      '주문 확정',
      '취소 요청',
      '취소 완료',
      '취소 실패',
      '배달 중',
      '배달 완료',
    ];
    const randomIndex = Math.floor(Math.random() * statuses.length);
    return statuses[randomIndex];
  }

  isOrderCancelable(orderId: string): boolean {
    const orderStatus = this.getOrderStatus(orderId);
    return orderStatus === '주문 요청';
  }

  cancelOrder(orderId: string): boolean {
    if (this.isOrderCancelable(orderId)) {
      // Todo 주문 취소 로직 구현
      return true; // 취소 완료
    }
    return false; // 취소 실패
  }

  getOrderHistory(userId: string): string[] {
    // Todo 데이터베이스나 외부 시스템에서 사용자의 주문 내역을 조회하는 로직을 구현해야 합니다.
    return ['주문 내역 1', '주문 내역 2', '주문 내역 3'];
  }
}
