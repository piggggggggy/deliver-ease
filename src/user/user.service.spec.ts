import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  describe('addUserFavorite', () => {
    it('should add a favorite store for the user', () => {
      const userId = 'user1';
      const storeId = 'store1';

      service.addUserFavorite(userId, storeId);

      expect(service.getUserFavorites(userId)).toContain(storeId);
    });
  });

  describe('removeUserFavorite', () => {
    it('should remove a favorite store for the user', () => {
      const userId = 'user1';
      const storeId = 'store1';

      service.addUserFavorite(userId, storeId);
      service.removeUserFavorite(userId, storeId);

      expect(service.getUserFavorites(userId)).not.toContain(storeId);
    });

    it('should not throw an error when removing a non-existent favorite store', () => {
      const userId = 'user1';
      const storeId = 'store1';

      expect(() => {
        service.removeUserFavorite(userId, storeId);
      }).not.toThrow();
    });
  });

  describe('getUserFavorites', () => {
    it('should return user favorites', () => {
      const userId = 'user1';
      const storeId1 = 'store1';
      const storeId2 = 'store2';

      service.addUserFavorite(userId, storeId1);
      service.addUserFavorite(userId, storeId2);

      const favorites = service.getUserFavorites(userId);
      expect(favorites).toContain(storeId1);
      expect(favorites).toContain(storeId2);
    });

    it('should return an empty array if user favorites do not exist', () => {
      const userId = 'user1';

      const favorites = service.getUserFavorites(userId);
      expect(favorites).toEqual([]);
    });
  });
});
