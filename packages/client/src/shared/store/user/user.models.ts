export interface IUserState {
  userData: Record<string, unknown> | null;
  isLoadingUserData: boolean;
  isLoggedIn: boolean;
}
