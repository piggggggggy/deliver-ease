import { Injectable } from '@nestjs/common';
import { StoreService } from '../store/store.service';

// temporary
interface DishEntity {
  id: number;
  storeId: string; // ?
  name: string;
  stock: number;
  price: number;
  img_url: string;
  description: string;
  category: string;
  options: {
    name: string;
    price: number;
  }[];
}

interface DishDto {
  storeId: string; // ?
  name: string;
  stock: number;
  price: number;
  img_url: string;
  description: string;
  category: string;
  options: {
    name: string;
    price: number;
  }[];
}

@Injectable()
export class DishService {
  private dish: DishEntity[] = [];

  // service
  registerDish(storeId: string, dishData: DishDto): boolean {
    // TODO: need to check storeId is valid
    const isValid = this.checkDishInfoValidation(dishData);
    if (isValid) {
      this.dish.push({
        id: this.dish.length + 1,
        storeId: '1',
        ...dishData,
      });
      return true;
    }
    throw new Error('Invalid dish data');
  }

  deleteDish(id: string): boolean {}

  updateDish(id: string, dishData: DishDto): boolean {}

  // unit function
  checkDishInfoValidation(dishData: any): boolean {
    const { name, stock, price, img_url, description, category, options } =
      dishData;
    return (
      this.checkNameValidation(name) &&
      this.checkDishImgUrl(img_url) &&
      this.checkNumberValidation(price) &&
      this.checkNumberValidation(stock) &&
      this.checkDishCategory(category) &&
      this.checkDishDescription(description) &&
      this.checkDishOptions(options)
    );
  }

  checkNameValidation(name: string): boolean {
    const maxLength = 16;
    return typeof name === 'string' && name.length <= maxLength && name !== '';
  }

  checkNumberValidation(price: number): boolean {
    return typeof price === 'number' && price > 0;
  }

  checkDishImgUrl(img_url: string): boolean {
    const urlPattern =
      /^(http(s)?:\/\/)(www\.)?([\w-]+\.)+[\w-]+(\/[\w-.\/?%&=]*)?$/;
    return typeof img_url === 'string' && urlPattern.test(img_url);
  }

  checkDishCategory(category: string): boolean {
    return typeof category === 'string' && category !== '';
  }

  checkDishDescription(description: string): boolean {
    return typeof description === 'string' && description !== '';
  }

  checkDishOptions(options: DishDto['options']): boolean {
    options.forEach((option) => {
      if (!this.checkNameValidation(option.name)) {
        return false;
      }
      if (!this.checkNumberValidation(option.price)) {
        return false;
      }
    });
    return true;
  }
}
