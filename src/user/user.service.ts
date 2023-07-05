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
}
