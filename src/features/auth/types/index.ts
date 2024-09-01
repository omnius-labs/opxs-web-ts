import { Dispatch, SetStateAction } from 'react';

export interface UserContextType {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  initUser: () => Promise<void>;
}

export interface User {
  id: string;
  name: string;
  role: UserRole;
  created_at: Date;
  updated_at: Date;
}

export enum UserRole {
  Admin = 'Admin',
  User = 'User'
}
