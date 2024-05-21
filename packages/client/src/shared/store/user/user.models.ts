import { IUser } from 'shared/api/authApi/auth.interface';

export interface IUserState {
  userData: IUser | null;
  isLoadingUserData: boolean;
  isLoggedIn: boolean;
}
