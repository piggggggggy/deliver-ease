export interface IOrderService {
  getOrderStatus(customerId: string, orderId: string): Promise<string | null>;
}

export interface IOrder {
  status: string;
}
