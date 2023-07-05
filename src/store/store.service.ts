import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class StoreService {
  private stores: any[] = [];

  registerStore(storeData: any): boolean {
    const isValid = this.checkStoreInfoValidation(storeData);
    if (isValid) {
      this.stores.push({
        id: this.stores.length + 1, // temporary
        ...storeData,
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
    this.checkInvalidStoreId(id);
    this.stores.filter((store) => store.id !== parseInt(id));
    return true;
  }

  updateStore(id: string, storeData: any): boolean {
    this.checkInvalidStoreId(id);
    const isValid = this.checkStoreInfoValidation(storeData);
    if (isValid) {
      this.stores = this.stores.map((store) =>
        store.id === parseInt(id) ? { ...store, ...storeData } : store,
      );
      return true;
    }
    throw new Error('Invalid store data');
  }

  // unit function
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
  checkStoreName(storeName: string): boolean {
    const maxLength = 16;
    return typeof storeName === 'string' && storeName.length <= maxLength;
  }

  checkStoreImgUrl(storeImgUrl: string): boolean {
    const urlPattern =
      /^(http(s)?:\/\/)(www\.)?([\w-]+\.)+[\w-]+(\/[\w-.\/?%&=]*)?$/;
    return typeof storeImgUrl === 'string' && urlPattern.test(storeImgUrl);
  }

  checkStoreBusinessHours(open_time: string, close_time: string): boolean {
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
}
