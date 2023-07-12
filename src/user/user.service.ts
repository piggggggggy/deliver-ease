import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  private userFavorites: Record<string, string[]> = {};

  addUserFavorite(userId: string, storeId: string): void {
    if (!this.userFavorites[userId]) {
      this.userFavorites[userId] = [];
    }
    this.userFavorites[userId].push(storeId);
  }

  removeUserFavorite(userId: string, storeId: string): void {
    if (this.userFavorites[userId]) {
      const index = this.userFavorites[userId].indexOf(storeId);
      if (index !== -1) {
        this.userFavorites[userId].splice(index, 1);
      }
    }
  }

  getUserFavorites(userId: string): string[] {
    return this.userFavorites[userId] || [];
  }
  private users = [
    {
      id: 1,
      pw: 'mypw',
      pwConfirm: 'mypw',
      type: 'user',
      name: 'Jerry',
      email: 'register@example.com',
    },
  ];

  isEmailRegistered(email: string): boolean {
    if (this.users.find((user) => user.email === email)) return true;
    return false;
  }

  isEmailFormat(email: string): boolean {
    const regex = /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    return regex.test(email);
  }

  isEqualPwConfirm(pw: string, pwConfirm: string): boolean {
    if (pw === pwConfirm) return true;
    return false;
  }

  async createUser(userInfo: any): Promise<any> {
    await this.users.push(userInfo);
    return this.users.find((user) => user.email === userInfo.email);
  }
}
