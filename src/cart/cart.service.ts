import { Injectable } from '@nestjs/common';

@Injectable()
export class CartService {
  private cartItems = [];

  validateCartTotalCount(totalCount): boolean {
    return 1 <= totalCount && totalCount <= 10;
  }

  // TODO: DB에서 생성하도록 수정예정
  async createCart(cartInfo): Promise<any> {
    await this.cartItems.push(cartInfo);
    return this.cartItems.find((item) => item.id === cartInfo.id);
  }

  // TODO: DB에서 조회히도록 수정예정
  async getCartItem(itemId): Promise<Promise<any>[]> {
    const item = await this.cartItems.find((item) => item.id === itemId);
    return item || [];
  }

  // TODO: DB에서 수정하도록 수정예정
  updateCartItem(cartInfo, updateCartInfo): boolean {
    const index = this.cartItems.findIndex((item) => item.id === cartInfo.id);
    if (index === -1) return false;
    this.cartItems[index] = updateCartInfo;
    return true;
  }

  // TODO: DB에서 삭제하도록 수정예정
  deleteCartItem(cartInfo): boolean {
    const index = this.cartItems.findIndex((item) => item.id === cartInfo.id);
    if (index === -1) return false;
    this.cartItems.splice(index, 1);
    return true;
  }

  validateCartUpdateInfo(updateCartInfo): boolean {
    return (
      this.isPositiveAmount(updateCartInfo.count) &&
      this.validateCartTotalCount(updateCartInfo.count)
    );
  }

  isPositiveAmount(count: number): boolean {
    return count > 0;
  }

  isStockRemain(stock, count): boolean {
    return stock >= count;
  }
}
