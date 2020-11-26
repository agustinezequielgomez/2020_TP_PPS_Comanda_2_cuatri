import { UserRoles } from '../Enums/user-roles.enum';

export interface User {
  ID?: number;
  UID: string;
  email: string;
  password: string;
  photoUrl: string;
  data?: UserInformation;
}

export interface UserInformation {
  DNI: number;
  name: string;
  lastName: string;
  role: UserRoles;
  deviceToken: string;
}

export interface ScannedUser {
  name: string;
  lastName: string;
  DNI: number;
}

export interface DBUserDocument {
  user: User;
}

export type Users = User[];
