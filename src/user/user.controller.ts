import { Controller, Post, Delete, Param, Get } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/:userId/favorite/:storeId')
  addFavorite(
    @Param('userId') userId: string,
    @Param('storeId') storeId: string,
  ): void {
    this.userService.addUserFavorite(userId, storeId);
  }

  @Delete('/:userId/favorite/:storeId')
  removeFavorite(
    @Param('userId') userId: string,
    @Param('storeId') storeId: string,
  ): void {
    this.userService.removeUserFavorite(userId, storeId);
  }

  @Get('/:userId/favorites')
  getFavorites(@Param('userId') userId: string): string[] {
    return this.userService.getUserFavorites(userId);
  }
}
