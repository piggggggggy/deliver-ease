import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
  let controller: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    }).compile();

    controller = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  describe('addFavorite', () => {
    it('should add a favorite store for the user', () => {
      const userId = 'user1';
      const storeId = 'store1';

      const spy = jest.spyOn(userService, 'addUserFavorite');

      controller.addFavorite(userId, storeId);

      expect(spy).toHaveBeenCalledWith(userId, storeId);
    });
  });

  describe('removeFavorite', () => {
    it('should remove a favorite store for the user', () => {
      const userId = 'user1';
      const storeId = 'store1';

      const spy = jest.spyOn(userService, 'removeUserFavorite');

      controller.removeFavorite(userId, storeId);

      expect(spy).toHaveBeenCalledWith(userId, storeId);
    });
  });

  describe('getFavorites', () => {
    it('should return user favorites', () => {
      const userId = 'user1';
      const favorites = ['store1', 'store2'];

      const spy = jest
        .spyOn(userService, 'getUserFavorites')
        .mockReturnValue(favorites);

      const result = controller.getFavorites(userId);

      expect(spy).toHaveBeenCalledWith(userId);
      expect(result).toEqual(favorites);
    });
  });
});
