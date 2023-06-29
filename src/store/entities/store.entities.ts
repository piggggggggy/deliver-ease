export class Store {
  id: number;
  user_id: number;
  name: string;
  menu: Menu[];
  open_time: string;
  close_time: string;
  at_least_order_price: number;
  img_url: string;
}

export class Menu {
  id: number;
  name: string;
  stock: number;
  price: number;
  img_url: string;
  category: MenuCategory;
  options: { name: string; price: number }[];
}

const MENU_CATEGORY = {
  main: 'main',
  side: 'side',
  drink: 'drink',
};

export type MenuCategory = keyof typeof MENU_CATEGORY;
