import { Injectable } from '@nestjs/common';

@Injectable()
export class OrderService {
  updateOrderStatus(orderInfo, orderStatus) {
    orderInfo.status.name = orderStatus;
    return orderInfo.status.name;
  }

  sendOrderAlarm(orderInfo) {
    return true;
  }
}
