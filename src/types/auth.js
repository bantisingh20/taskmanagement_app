export type UserType = 'visitor' | 'employee';

export interface LoginFormData {
  email: string;
  password: string;
  userType: UserType;
}
