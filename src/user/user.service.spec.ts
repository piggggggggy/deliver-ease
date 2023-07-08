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

  const badUserInfo = {
    id: 1,
    pw: 'mypw',
    pwConfirm: 'mypw123',
    type: 'user',
    name: 'John',
    email: 'newregister!!!!example.com',
  };

  const goodUserInfo = {
    id: 1,
    pw: 'mypw',
    pwConfirm: 'mypw',
    type: 'user',
    name: 'Jerry',
    email: 'newregister@example.com',
  };
  describe('validateUser', () => {
    it('should be check email is already registered and return true', () => {
      expect(service.isEmailRegistered('register@example.com')).toBe(true);
    });
    it('should be check email is already registered and return false', () => {
      expect(service.isEmailRegistered('new@example.com')).toBe(false);
    });

    it('should be check email format and return true', () => {
      expect(service.isEmailFormat(goodUserInfo.email)).toBe(true);
    });
    it('should be check email format and return false', () => {
      expect(service.isEmailFormat(badUserInfo.email)).toBe(false);
    });

    it('should be check equal pw and pwConfirm and return false', () => {
      const diffPw = service.isEqualPwConfirm(
        badUserInfo.pw,
        badUserInfo.pwConfirm,
      );
      expect(diffPw).toBe(false);
    });
    it('should be check equal pw and pwConfirm and return true', () => {
      const samePw = service.isEqualPwConfirm(
        goodUserInfo.pw,
        goodUserInfo.pwConfirm,
      );
      expect(samePw).toBe(true);
    });
  });

  describe('createUser', () => {
    it('should be return crated userInfo', async () => {
      const savedUser = await service.createUser(goodUserInfo);
      expect(savedUser).toEqual(goodUserInfo);
    });
  });
});
