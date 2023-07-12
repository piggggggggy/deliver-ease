import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class StoreService {
  private stores: any[] = [];

  // main service function
  registerStore(storeData: any): boolean {
    const isValid = this.checkStoreInfoValidation(storeData);
    if (isValid) {
      this.stores.push({
        id: this.stores.length + 1, // temporary
        ...storeData,
        dishes: [],
      });
      return true;
    }
    throw new Error('Invalid store data');
  }

  getOneStore(id: string): any {
    const store = this.stores.find((store) => store.id === parseInt(id));
    if (!store) {
      throw new NotFoundException(`Store with ID ${id} not found.`);
    }
    return store;
  }

  deleteStore(id: string): boolean {
    // this.checkInvalidStoreId(id);
    // this.stores.filter((store) => store.id !== parseInt(id));
    // return true;
    try {
      this.checkInvalidStoreId(id);
      this.stores.filter((store) => store.id !== parseInt(id));
    } catch (error) {
      return false;
    }
    return true;
  }

  updateStore(id: string, storeData: any) {
    try {
      this.checkInvalidStoreId(id);
      const isValid = this.checkStoreInfoValidation(storeData);
      if (isValid) {
        this.stores = this.stores.map((store) =>
          store.id === parseInt(id) ? { ...store, ...storeData } : store,
        );
      }
    } catch (error) {
      throw new Error(`Invalid storeId or store data : ${error.message}`);
    }
  }

  // dish service function
  registerStoreDish(storeId: string, dishData: any): boolean {
    try {
      this.checkInvalidStoreId(storeId);
      const isValid = this.checkStoreDishValidation(dishData);
      if (isValid) {
        const store = this.getOneStore(storeId);
        store.dishes.push({
          id: store.dishes.length + 1, // temporary
          ...dishData,
        });
        return true;
      }
    } catch (error) {
      throw new Error(`Invalid storeId or dish data : ${error.message}`);
    }
  }
  deleteStoreDish(storeId: string, dishId: string) {
    try {
      this.checkInvalidStoreId(storeId);
      const store = this.getOneStore(storeId);
      store.dishes.filter((dish) => dish.id !== parseInt(dishId));
    } catch (error) {
      throw new Error(`Invalid storeId or dishId : ${error.message}`);
    }
  }
  updateStoreDish(storeId: string, dishId: string, dishData: any) {
    try {
      this.checkInvalidStoreId(storeId);
      const isValid = this.checkStoreDishValidation(dishData);
      if (isValid) {
        const store = this.getOneStore(storeId);
        store.dishes = store.dishes.map((dish) =>
          dish.id === parseInt(dishId) ? { ...dish, ...dishData } : dish,
        );
      }
    } catch (error) {
      throw new Error(
        `Invalid storeId or dishId or dish data : ${error.message}`,
      );
    }
  }

  /* unit function */
  // main store unit function
  checkInvalidStoreId(id: string): boolean {
    try {
      this.getOneStore(id);
    } catch (error) {
      throw new Error('Invalid store id');
    }
    return true;
  }

  checkStoreInfoValidation(storeData: any): boolean {
    const {
      storeName,
      storeImgUrl,
      open_time,
      close_time,
      at_least_order_price,
    } = storeData;
    return (
      this.checkStoreName(storeName) &&
      this.checkStoreImgUrl(storeImgUrl) &&
      this.checkStoreBusinessHours(open_time, close_time) &&
      this.checkStoreMiniumPriceForDelivering(at_least_order_price)
    );
  }

  // sub unit function
  // dish unit function
  checkStoreDishValidation(dishData: any): boolean {
    const { name, imgUrl, price, stock, category, options } = dishData;
    return (
      this.checkStoreDishName(name) &&
      this.checkStoreDishImgUrl(imgUrl) &&
      this.checkStoreDishPrice(price) &&
      this.checkStoreDishStock(stock) &&
      this.checkStoreDishCategory(category) &&
      this.checkStoreDishOptions(options)
    );
  }

  // sub unit function
  // main
  checkStoreName(storeName: string): boolean {
    const maxLength = 16;
    return typeof storeName === 'string' && storeName.length <= maxLength;
  }

  checkStoreImgUrl(storeImgUrl: string): boolean {
    // 정규 표현식을 사용하여 URL 패턴을 확인
    const urlPattern =
      /^(http(s)?:\/\/)(www\.)?([\w-]+\.)+[\w-]+(\/[\w-.\/?%&=]*)?$/;
    return typeof storeImgUrl === 'string' && urlPattern.test(storeImgUrl);
  }

  checkStoreBusinessHours(open_time: string, close_time: string): boolean {
    // 정규 표현식을 사용하여 시간 패턴을 확인
    const timePattern = /^(?:[01]\d|2[0123]):(?:[012345]\d):(?:[012345]\d)$/;
    return (
      typeof open_time === 'string' &&
      typeof close_time === 'string' &&
      timePattern.test(open_time) &&
      timePattern.test(close_time)
    );
  }

  checkStoreMiniumPriceForDelivering(at_least_order_price: number): boolean {
    return typeof at_least_order_price === 'number' && at_least_order_price > 0;
  }

  // dish
  checkStoreDishName(dishName: string): boolean {
    const maxLength = 16;
    return typeof dishName === 'string' && dishName.length <= maxLength;
  }
  checkStoreDishImgUrl(dishImgUrl: string): boolean {
    const urlPattern =
      /^(http(s)?:\/\/)(www\.)?([\w-]+\.)+[\w-]+(\/[\w-.\/?%&=]*)?$/;
    return typeof dishImgUrl === 'string' && urlPattern.test(dishImgUrl);
  }
  checkStoreDishPrice(dishPrice: number): boolean {
    return typeof dishPrice === 'number' && dishPrice > 0;
  }
  checkStoreDishStock(dishStock: number): boolean {
    return typeof dishStock === 'number' && dishStock > 0;
  }
  checkStoreDishCategory(dishCategory: string): boolean {
    return typeof dishCategory === 'string' && dishCategory !== '';
  }
  checkStoreDishOptions(
    dishOptions: { name: string; price: number }[],
  ): boolean {
    let isValid = true; // 유효성 검사 결과를 저장할 변수

    dishOptions.forEach((option) => {
      if (!this.checkStoreDishName(option.name)) {
        isValid = false;
        return; // 유효성 검사 실패 시, 콜백 함수에서 바로 반환하여 순회를 중단
      }
      if (!this.checkStoreDishPrice(option.price)) {
        isValid = false;
        return; // 유효성 검사 실패 시, 콜백 함수에서 바로 반환하여 순회를 중단
      }
    });

    return isValid;
  }
}
