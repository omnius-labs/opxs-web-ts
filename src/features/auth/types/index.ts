export enum UserRole {
  Admin = 'Admin',
  User = 'User'
}

export interface User {
  id: string;
  name: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}
