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
    storeImgUrl: 'invalid url',
    open_time: 'invalid time',
    close_time: 'invalid time',
    at_least_order_price: 'invalid price',
  };
  const argsToBeExpectedValid = {
    storeName: 'validName',
    storeImgUrl: 'http://valid-url.com/image.jpg',
    open_time: '09:00:00',
    close_time: '18:00:00',
    at_least_order_price: 10000,
  };

  // Helper unit test
  describe('Helper unit test function', () => {
    describe('checkStoreInfoValidation', () => {
  const argsToBeExpectedInvalidDish = {
    name: 'long long long long and invalid dish name',
    imgUrl: 'invalid url',
    price: -10,
    stock: -10,
    category: '',
    options: [
      { name: 'invalid option name', price: -10 },
      { name: 'invalid option name', price: -10 },
    ],
  };
  const argsToBeExpectedValidDish = {
    name: 'validName',
    imgUrl: 'http://valid-url.com/image.jpg',
    price: 10000,
    stock: 100,
    category: 'main',
    options: [
      { name: 'valid name', price: 1000 },
      { name: 'valid name', price: 1000 },
    ],
  };

  /* unit test
   * these are units of store service.
   * */
  describe('test store main unit funciton', () => {
    describe('unit - checkStoreInfoValidation', () => {
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

      it('should return true with ', () => {
        const result = service.checkStoreInfoValidation(argsToBeExpectedValid);

        expect(result).toBe(true);
      });
    });


    describe('checkStoreName', () => {
      it('should return false', () => {

    describe('subUnit - checkStoreName', () => {
      it('should return false with invalid argument', () => {
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
    describe('subUnit - checkStoreImgUrl', () => {
      it('should return false with invalid url', () => {
        const result = service.checkStoreImgUrl(
          argsToBeExpectedInvalid.storeImgUrl,
        );
        expect(result).toBe(false);
      });

      it('should return false with invalid argument', () => {
        const result = service.checkStoreImgUrl('invalid url');
        expect(result).toBe(false);
      });

      it('should return true', () => {

      it('should return true with valid url', () => {
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
    // TODO: need to be refactored with date policy
    describe('subUnit - checkStoreBusinessHours', () => {
      it('should return false with invalid argument', () => {
        const result = service.checkStoreBusinessHours(
          argsToBeExpectedInvalid.open_time,
          argsToBeExpectedInvalid.close_time,
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
    describe('subUnit - checkStoreMiniumPriceForDelivering', () => {
      it('should return false with out-of-range price', () => {
        const result = service.checkStoreMiniumPriceForDelivering(-5);
        expect(result).toBe(false);
      });

      it('should return true with valid price', () => {
        const result = service.checkStoreMiniumPriceForDelivering(10000);
        expect(result).toBe(true);
      });
    });
  });

  describe('test store dish unit function', () => {
    describe('unit - checkStoreDishValidation', () => {
      it('should return false with invalid argument', () => {
        const result = service.checkStoreDishValidation(
          argsToBeExpectedInvalidDish,
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

  /* Service unit test function */
  // registerStore
  describe('Register Store', () => {
      it('should return true with ', () => {
        const result = service.checkStoreDishValidation(
          argsToBeExpectedValidDish,
        );
        expect(result).toBe(true);
      });
    });

    describe('subUnit - checkStoreDishName', () => {
      it('should return false with invalid argument', () => {
        const result = service.checkStoreDishName(
          argsToBeExpectedInvalid.storeName,
        );
        expect(result).toBe(false);
      });
      it('should return true', () => {
        const result = service.checkStoreDishName('validName');
        expect(result).toBe(true);
      });
    });

    describe('subUnit - checkStoreDishStock', () => {
      it('should return false with with out-of-range stock', () => {
        const result = service.checkStoreDishStock(-1);
        expect(result).toBe(false);
      });
      it('should return true', () => {
        const result = service.checkStoreDishStock(10);
        expect(result).toBe(true);
      });
    });

    describe('subUnit - checkStoreDishImgUrl', () => {
      it('should return false with invalid url', () => {
        const result = service.checkStoreDishImgUrl(
          argsToBeExpectedInvalid.storeImgUrl,
        );
        expect(result).toBe(false);
      });

      it('should return true with valid url', () => {
        const result = service.checkStoreDishImgUrl(
          'http://valid-url.com/image.jpg',
        );
        expect(result).toBe(true);
      });
    });

    describe('subUnit - checkStoreDishPrice', () => {
      it('should return false with out-of-range price', () => {
        const result = service.checkStoreDishPrice(-5);
        expect(result).toBe(false);
      });

      it('should return true with valid price', () => {
        const result = service.checkStoreDishPrice(10000);
        expect(result).toBe(true);
      });
    });

    describe('subUnit - checkStoreDishCategory', () => {
      it('should return false with invalid category', () => {
        const result = service.checkStoreDishCategory('');
        expect(result).toBe(false);
      });

      it('should return true with valid category', () => {
        const result = service.checkStoreDishCategory('main');
        expect(result).toBe(true);
      });
    });

    describe('subUnit - checkStoreDishOptions', () => {
      it('should return false with invalid options', () => {
        const invalidOptions = [
          {
            name: 'option1123456789012345',
            price: -100,
          },
          {
            name: '',
            price: 1,
          },
        ];
        const result = service.checkStoreDishOptions(invalidOptions);
        expect(result).toBe(false);
      });

      it('should return true with valid options', () => {
        const validOptions = [
          { name: 'valid name', price: 1000 },
          { name: 'valid name', price: 1000 },
        ];
        const result = service.checkStoreDishOptions(validOptions);
        expect(result).toBe(true);
      });
    });
  });
  /* Service function test */
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
      const result = service.registerStore(argsToBeExpectedValid);
      expect(result).toBe(true);
      const store = service.getOneStore('1');
      expect(store).toBeDefined();
      service.deleteStore('1');
    });
  });

  // deleteStore
  // TODO: add auth check before delete api
  describe('Delete Store', () => {
    it('should return false with invalid argument', () => {
      const result = service.deleteStore('invalidId');
  // TODO: add auth check before delete api
  describe('Delete Store - deleteStore', () => {
    it('should return false with nonexistent storeId', () => {
      const result = service.deleteStore('999');
      expect(result).toBe(false);
    });

    it('should return true', () => {
      service.registerStore(argsToBeExpectedToReturnTrue);

      service.registerStore(argsToBeExpectedValid);
      const result = service.deleteStore('1');
      expect(result).toBe(true);
    });
  });

  // editStore
  // TODO: add auth check before delete api
  describe('Edit Store', () => {
    it('should return false with invalid argument', () => {
      const result = service.editStore('invalidId', argsToBeExpectedInvalid);
      expect(result).toBe(false);
    });

    it('should return true', () => {
      service.registerStore(argsToBeExpectedToReturnTrue);
      const result = service.editStore('1', argsToBeExpectedToReturnTrue);
      expect(result).toBe(true);
  describe('Update Store - updateStore', () => {
    it('should return false with nonexistent storeId', () => {
      try {
        service.updateStore('nonexistentId', argsToBeExpectedInvalid);
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
      }
    });

    it('should return true', () => {
      service.registerStore(argsToBeExpectedValid);
      service.updateStore('1', argsToBeExpectedValid);
      service.deleteStore('1');
    });
  });

  describe('Dish CUD Test', () => {
    beforeEach(() => {
      service.registerStore(argsToBeExpectedValid);
      const store = service.getOneStore('1');
      expect(`${store.id}`).toBe('1');
    });

    describe('Register Store Dish - registerStoreDish', () => {
      it('should return false with invalid argument', () => {
        try {
          service.registerStoreDish('1', argsToBeExpectedInvalidDish);
        } catch (error) {
          expect(error).toBeInstanceOf(Error);
        }
      });

      it('should return true', () => {
        const result = service.registerStoreDish(
          '1',
          argsToBeExpectedValidDish,
        );
        expect(result).toBe(true);
        service.deleteStoreDish('1', '1');
      });
    });

    describe('Delete Store Dish - deleteStoreDish', () => {
      it('should return false with nonexistent dishId', () => {
        try {
          service.deleteStoreDish('1', '999');
        } catch (error) {
          expect(error).toBeInstanceOf(Error);
        }
      });

      it('should return true', () => {
        service.registerStoreDish('1', argsToBeExpectedValidDish);
        service.deleteStoreDish('1', '1');
      });
    });

    describe('Update Store Dish - updateStoreDish', () => {
      it('should return false with nonexistent dishId', () => {
        try {
          service.updateStoreDish(
            '1',
            'nonexistentId',
            argsToBeExpectedInvalidDish,
          );
        } catch (error) {
          expect(error).toBeInstanceOf(Error);
        }
      });

      it('should return true', () => {
        service.registerStoreDish('1', argsToBeExpectedValidDish);
        service.updateStoreDish('1', '1', argsToBeExpectedValidDish);
        service.deleteStoreDish('1', '1');
      });
    });
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
