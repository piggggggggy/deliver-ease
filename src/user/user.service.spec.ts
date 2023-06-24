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

  describe('validateUser', () => {
    it('check email is already registered', () => {
      expect(service.isEmailRegistered('registered@example.com')).toBe(false);
    });

    it('check email format', () => {
      const result = service.validateUser({
        id: 1,
        pw: 'mypw',
        pwConfirm: 'mypw',
        type: 'user',
        name: 'John',
        email: 'newregister!!!!example.com',
      });
      expect(result).toBe(false);
    });

    it('check equal pw and pwConfirm', () => {
      const diffPw = service.validateUser({
        id: 1,
        pw: 'mypw',
        pwConfirm: 'yourpw',
        type: 'user',
        name: 'John',
        email: 'test@test.com',
      });
      const samePw = service.validateUser({
        id: 1,
        pw: 'mypw',
        pwConfirm: 'mypw',
        type: 'user',
        name: 'John',
        email: 'test@test.com',
      });
      expect(diffPw).toBe(false);
      expect(samePw).toBe(true);
    });

    // 이외의 경우 true를 반환
    it('should be return true', () => {
      const userInfo = {
        id: 1,
        pw: 'mypw',
        pwConfirm: 'mypw',
        type: 'user',
        name: 'John',
        email: 'newregister@example.com',
      };
      const result = service.validateUser(userInfo);

      expect(result).toBe(true);
    });
  });

  describe('createUser', () => {
    const userInfo = {
      id: 1,
      email: 'test@test.com',
      pw: 'qweqwe',
      pwConfirm: 'qweqwe',
      type: 'user',
      name: 'John',
    };

    it('should return true if user creation success', async () => {
      const savedUser = await service.createUser(userInfo);
      expect(savedUser).toEqual(userInfo);
    });
  });
});
