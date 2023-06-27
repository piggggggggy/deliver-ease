import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

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
    it('check email is already registered', () => {
      expect(service.isEmailRegistered(badUserInfo.email)).toBe(false);
      expect(service.isEmailRegistered(goodUserInfo.email)).toBe(true);
    });

    it('check email format', () => {
      expect(service.isEmailFormat(badUserInfo.email)).toBe(false);
      expect(service.isEmailFormat(goodUserInfo.email)).toBe(true);
    });

    it('check equal pw and pwConfirm', () => {
      const diffPw = service.isEqualPwConfirm(
        badUserInfo.pw,
        badUserInfo.pwConfirm,
      );
      const samePw = service.isEqualPwConfirm(
        goodUserInfo.pw,
        goodUserInfo.pwConfirm,
      );
      expect(diffPw).toBe(false);
      expect(samePw).toBe(true);
    });
  });

  describe('createUser', () => {
    it('should return true if user creation success', async () => {
      const savedUser = await service.createUser(goodUserInfo);
      expect(savedUser).toEqual(goodUserInfo);
    });
  });
});
