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
  const badCartInfo = { id: 1, user_id: 1, store_id: 2, count: -1 };
  const goodCartInfo = { id: 1, user_id: 1, store_id: 2, count: 1 };
  const updateCartInfo = { id: 1, user_id: 1, store_id: 2, count: 2 };
  describe('validateCartCreateInfo', () => {
    it('should be ', async () => {
      expect(service.isPositiveAmount(badCartInfo)).toBe(false);
      expect(service.isPositiveAmount(goodCartInfo)).toBe(true);
    });
    it('isStockRemain', async () => {
      expect(await service.isStockRemain(stockInfo, badCartInfo)).toBe(false);
      expect(await service.isStockRemain(stockInfo, goodCartInfo)).toBe(true);
    });
  });

  describe('create Cart', () => {
    it('should return true', async () => {
      expect(await service.createCart(goodCartInfo)).toBe(true);
    });
  });

  describe('getCart', () => {
    it('should return []', async () => {
      expect(await service.getCart(1)).toEqual([]);
    });

    it('should return [goodCartInfo]', async () => {
      await service.createCart(goodCartInfo);
      expect(await service.getCart(1)).toEqual([goodCartInfo]);
    });
  });

  describe('validateCartUpdateInfo', async () => {
    await service.createCart(goodCartInfo);

    it('should be return true', async () => {
      expect(service.validateCartUpdateInfo(goodCartInfo, updateCartInfo)).toBe(
        true,
      );
    });
    it('should be return false', async () => {
      expect(service.validateCartUpdateInfo(badCartInfo, updateCartInfo)).toBe(
        false,
      );
    });
  });

  describe('updateCart', async () => {
    await service.createCart(goodCartInfo);
    it('should be return true', async () => {
      expect(service.updateCart(goodCartInfo, updateCartInfo)).toBe(true);
    });
  });

  describe('deleteCart', async () => {
    await service.createCart(goodCartInfo);
    it('should be return true', async () => {
      expect(service.deleteCart(goodCartInfo)).toBe(true);
    });

    it('should be return false', async () => {
      expect(service.deleteCart(badCartInfo)).toBe(false);
    });
  });
});
