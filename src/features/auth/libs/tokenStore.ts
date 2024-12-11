'use client';

import { AuthToken } from '../../../shared/types/AuthToken';

class TokenStore {
  private static storageKey: string = 'auth_token';

  public static setToken(token: AuthToken): void {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(token));
    } catch (error) {
      console.error('Failed to save the token to localStorage', error);
    }
  }

  public static getToken(): AuthToken | null {
    try {
      const tokenString = localStorage.getItem(this.storageKey);
      if (tokenString === null) {
        return null;
      }
      const token: AuthToken = JSON.parse(tokenString);
      return token;
    } catch (error) {
      console.error('Failed to get the token from localStorage', error);
      return null;
    }
  }

  public static removeToken(): void {
    try {
      localStorage.removeItem(this.storageKey);
    } catch (error) {
      console.error('Failed to remove the token from localStorage', error);
    }
  }

  public static hasToken(): boolean {
    return this.getToken() !== null;
  }
}

export const tokenStore = TokenStore;
