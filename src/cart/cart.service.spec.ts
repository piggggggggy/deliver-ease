import { Test, TestingModule } from '@nestjs/testing';
import { CartService } from './cart.service';

describe('CartService', () => {
  let service: CartService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CartService],
    }).compile();

    service = module.get<CartService>(CartService);
  });

  const stockInfo = { id: 1, store_id: 2, dish_id: 1, stock: 1 };
  const badCartInfo = { id: -1, user_id: -1, store_id: -2, count: -1 };
  const goodCartInfo = { id: 1, user_id: 1, store_id: 2, count: 1 };
  const overCartInfo = { id: 1, user_id: 1, store_id: 2, count: 11 };
  const updateCartInfo = { id: 1, user_id: 1, store_id: 2, count: 2 };
  describe('validateCartCreateInfo', () => {
    it('should be check cart item positive count and return true', async () => {
      expect(service.isPositiveAmount(goodCartInfo.count)).toBe(true);
    });
    it('should be check cart item positive count and return false', async () => {
      expect(service.isPositiveAmount(badCartInfo.count)).toBe(false);
    });
    it('should be compare material stock and cartItem count, return true', () => {
      expect(service.isStockRemain(stockInfo.stock, goodCartInfo.count)).toBe(
        true,
      );
    });
    it('should be compare material stock and cartItem count, return false', () => {
      expect(service.isStockRemain(stockInfo.stock, overCartInfo.count)).toBe(
        false,
      );
    });
  });

  describe('validateCartTotalCount()', () => {
    it('should be return true about 1 <= totalCount <= 10', async () => {
      expect(await service.validateCartTotalCount(1)).toBe(true);
      expect(await service.validateCartTotalCount(2)).toBe(true);
      expect(await service.validateCartTotalCount(7)).toBe(true);
      expect(await service.validateCartTotalCount(10)).toBe(true);
    });

    it('should be return false about 1 > totalCount || totalCount > 10', async () => {
      expect(await service.validateCartTotalCount(0)).toBe(false);
      expect(await service.validateCartTotalCount(-2)).toBe(false);
      expect(await service.validateCartTotalCount(11)).toBe(false);
    });
  });

  describe('create Cart', () => {
    it('should return true', async () => {
      const saveCartInfo = await service.createCart(goodCartInfo);
      expect(saveCartInfo).toEqual(goodCartInfo);
    });
  });

  describe('getCartItem using id', () => {
    it('should be return []', async () => {
      expect(await service.getCartItem(-1)).toEqual([]);
    });

    it('should be return goodCartInfo', async () => {
      await service.createCart(goodCartInfo);
      expect(await service.getCartItem(1)).toEqual(goodCartInfo);
    });
  });

  describe('validateCartUpdateInfo', () => {
    it('should be validate updateInfo and return true', async () => {
      expect(service.validateCartUpdateInfo(updateCartInfo)).toBe(true);
    });
    it('should be validate updateInfo and return false', async () => {
      updateCartInfo.count = -1;
      expect(service.validateCartUpdateInfo(updateCartInfo)).toBe(false);
    });
  });

  describe('updateCart', () => {
    it('should be update item and return true', async () => {
      await service.createCart(goodCartInfo);
      expect(service.updateCartItem(goodCartInfo, updateCartInfo)).toBe(true);
    });
    it('should be update item and return false', async () => {
      await service.createCart(badCartInfo);
      expect(service.updateCartItem(goodCartInfo, updateCartInfo)).toBe(false);
    });
  });

  describe('deleteCart', () => {
    it('should be delete item and return true', async () => {
      await service.createCart(goodCartInfo);
      expect(service.deleteCartItem(goodCartInfo)).toBe(true);
    });

    it('should be delete item and return false', async () => {
      await service.createCart(goodCartInfo);
      expect(service.deleteCartItem(badCartInfo)).toBe(false);
    });
  });
});
