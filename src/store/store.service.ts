import { Injectable, NotFoundException } from '@nestjs/common';
import { Store } from './entities/store.entities';

@Injectable()
export class StoreService {
  private stores: Store[] = [];

  registerStore(storeData): boolean {
    this.stores.push({
      id: this.stores.length + 1, // temporary
      ...storeData,
    });
    return true;
  }

  getOneStore(id: string): Store {
    const store = this.stores.find((store) => store.id === parseInt(id));
    if (!store) {
      throw new NotFoundException(`Store with ID ${id} not found.`)
    }
    return store;
  }

  deleteStore(id: string): boolean {
    this.getOneStore(id);
    this.stores.filter((store) => store.id !== parseInt(id));
    return true;
  }
}
