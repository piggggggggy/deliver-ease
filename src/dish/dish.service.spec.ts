import { Test, TestingModule } from '@nestjs/testing';
import { DishService } from './dish.service';

describe('DishService', () => {
  let service: DishService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DishService],
    }).compile();

    service = module.get<DishService>(DishService);
  });

  const argsToBeExpectedInvalid = {
    name: 'long long long long and invalid store name',
    stock: 'invalid stock',
    price: 'invalid price',
    img_url: 1234,
    category: 'invalid category',
    description: 'invalid description',
    options: [
      {
        name: 'invalid option name',
        price: 'invalid option price',
      },
      {
        name: 'invalid option name',
        price: -1,
      },
    ],
  };

  const argsToBeExpectedToReturnTrue = {
    name: 'validName',
    stock: 100,
    price: 10000,
    img_url: 'http://valid-url.com/image.jpg',
    category: 'valid category',
    description: 'valid description',
    options: [
      {
        name: 'valid option name',
        price: 1000,
      },
    ],
  };

  describe('Helper unit test function', () => {
    describe('checkDishInfoValidation', () => {
      it('should return false with invalid argument', () => {
        const result = service.checkDishInfoValidation(argsToBeExpectedInvalid);
        expect(result).toBe(false);
      });

      it('should return true', () => {
        const result = service.checkDishInfoValidation(
          argsToBeExpectedToReturnTrue,
        );
        expect(result).toBe(true);
      });
    });

    describe('checkNameValidation', () => {
      it('should return false', () => {
        const result = service.checkNameValidation(
          argsToBeExpectedInvalid.name,
        );
        expect(result).toBe(false);
      });
      it('should return true', () => {
        const result = service.checkNameValidation('validName');
        expect(result).toBe(true);
      });
    });

    describe('checkNumberValidation', () => {
      it('should return false', () => {
        const result = service.checkNumberValidation(
          argsToBeExpectedInvalid.stock as number,
        );
        expect(result).toBe(false);
      });

      it('should return true', () => {
        const result = service.checkNumberValidation(100);
        expect(result).toBe(true);
      });
    });

    describe('checkDishImgUrl', () => {
      it('should return false', () => {
        const result = service.checkDishImgUrl(
          argsToBeExpectedInvalid.img_url as string,
        );
        expect(result).toBe(false);
      });

      it('should return true', () => {
        const result = service.checkDishImgUrl(
          argsToBeExpectedToReturnTrue.img_url,
        );
        expect(result).toBe(true);
      });
    });

    describe('checkDishCategory', () => {
      it('should return false', () => {
        const result = service.checkDishCategory(
          argsToBeExpectedInvalid.category,
        );
        expect(result).toBe(false);
      });

      it('should return true', () => {
        const result = service.checkDishCategory(
          argsToBeExpectedToReturnTrue.category,
        );
        expect(result).toBe(true);
      });
    });

    describe('checkDishDescription', () => {
      it('should return false', () => {
        const result = service.checkDishDescription(
          argsToBeExpectedInvalid.description,
        );
        expect(result).toBe(false);
      });

      it('should return true', () => {
        const result = service.checkDishDescription(
          argsToBeExpectedToReturnTrue.description,
        );
        expect(result).toBe(true);
      });
    });

    describe('checkDishOptions', () => {
      it('should return false', () => {
        const result = service.checkDishOptions(
          argsToBeExpectedInvalid.options as { name: string; price: number }[],
        );
        expect(result).toBe(false);
      });

      it('should return true', () => {
        const result = service.checkDishOptions(
          argsToBeExpectedToReturnTrue.options,
        );
        expect(result).toBe(true);
      });
    });
  });

  describe('registerDish', () => {});

  describe('deleteDish', () => {});

  describe('updateDish', () => {});

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
