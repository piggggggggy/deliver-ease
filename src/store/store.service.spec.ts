import { Test, TestingModule } from '@nestjs/testing';
import { StoreService } from './store.service';

describe('StoreService', () => {
  let service: StoreService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StoreService],
    }).compile();

    service = module.get<StoreService>(StoreService);
  });

  const argsToBeExpectedInvalid = {
    storeName: 'long long long long and invalid store name',
    storeImgUrl: 1234,
    open_time: undefined,
    close_time: undefined,
    at_least_order_price: 'invalid price',
  };
  const argsToBeExpectedToReturnTrue = {
    storeName: 'validName',
    storeImgUrl: 'http://valid-url.com/image.jpg',
    open_time: '09:00:00',
    close_time: '18:00:00',
    at_least_order_price: 10000,
  };

  // Helper unit test
  describe('Helper unit test function', () => {
    describe('checkStoreInfoValidation', () => {
      it('should return false with invalid argument', () => {
        const result = service.checkStoreInfoValidation(
          argsToBeExpectedInvalid,
        );
        expect(result).toBe(false);
      });

      it('should return true', () => {
        const result = service.checkStoreInfoValidation(
          argsToBeExpectedToReturnTrue,
        );
        expect(result).toBe(true);
      });
    });

    describe('checkStoreName', () => {
      it('should return false', () => {
        const result = service.checkStoreName(
          argsToBeExpectedInvalid.storeName,
        );
        expect(result).toBe(false);
      });
      it('should return true', () => {
        const result = service.checkStoreName('validName');
        expect(result).toBe(true);
      });
    });

    describe('checkStoreImgUrl', () => {
      it('should return false with Number argument', () => {
        const result = service.checkStoreImgUrl(
          argsToBeExpectedInvalid.storeImgUrl as string,
        );
        expect(result).toBe(false);
      });

      it('should return false with invalid argument', () => {
        const result = service.checkStoreImgUrl('invalid url');
        expect(result).toBe(false);
      });

      it('should return true', () => {
        const result = service.checkStoreImgUrl(
          'http://valid-url.com/image.jpg',
        );
        expect(result).toBe(true);
      });
    });

    // TODO: need to be refactored
    describe('checkStoreBusinessHours', () => {
      it('should return false with invalid argument', () => {
        const result = service.checkStoreBusinessHours(
          argsToBeExpectedInvalid.open_time as string,
          argsToBeExpectedInvalid.close_time as string,
        );
        expect(result).toBe(false);
      });

      it('should return true', () => {
        const result = service.checkStoreBusinessHours('09:00:00', '18:00:00');
        expect(result).toBe(true);
      });
    });

    describe('checkStoreMiniumPriceForDelivering', () => {
      it('should return false with string argument', () => {
        const result = service.checkStoreMiniumPriceForDelivering(
          argsToBeExpectedInvalid.at_least_order_price as number,
        );
        expect(result).toBe(false);
      });

      it('should return false with invalid argument', () => {
        const result = service.checkStoreMiniumPriceForDelivering(-5);
        expect(result).toBe(false);
      });

      it('should return true', () => {
        const result = service.checkStoreMiniumPriceForDelivering(10000);
        expect(result).toBe(true);
      });
    });
  });

  // Service unit test function
  describe('Register Store - registerStore', () => {
    it('should return false with invalid argument', () => {
      try {
        service.registerStore(argsToBeExpectedInvalid);
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
      }
    });

    it('should return true', () => {
      const result = service.registerStore(argsToBeExpectedToReturnTrue);
      expect(result).toBe(true);
      const store = service.getOneStore('1');
      expect(store).toBeDefined();
      service.deleteStore('1');
    });
  });

  describe('Delete Store', () => {});

  describe('Edit Store', () => {});

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
