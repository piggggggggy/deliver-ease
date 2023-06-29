import { Body, Controller, Delete, Param, Patch, Post } from "@nestjs/common";
import { StoreService } from './store.service';

@Controller('store')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Post()
  registerStore(@Body() storeData: any): boolean {
    return this.storeService.registerStore(storeData);
  }

  @Delete(':id')
  deleteStore(@Param('id') storeId: string): boolean {
    return this.storeService.deleteStore(storeId);
  }

  @Patch(':id')
  updateStore(@Param('id') storeId: string) {
    return 'updateStore';
  }

  @Post(':id/menu')
  addMenu(@Param('id') storeId: string) {
    return 'addMenu';
  }

  @Delete(':id/menu/:menuName')
  deleteMenu(@Param('id') storeId: string, @Param('menuName') menuName: string) {
    return 'deleteMenu';
  }

  @Patch(':id/menu/:menuName')
  updateMenu(@Param('id') storeId: string, @Param('menuName') menuName: string) {
    return 'updateMenu';
  }
}
