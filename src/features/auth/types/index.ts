export enum UserRole {
  Admin = 'Admin',
  User = 'User'
}

export interface User {
  id: string;
  name: string;
  role: UserRole;
  created_at: Date;
  updated_at: Date;
}

export interface AuthToken {
  access_token: string;
  refresh_token: string;
}
