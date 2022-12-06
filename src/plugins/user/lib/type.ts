export interface User {
  id: string;
  username: string;
  nickname: string;
  mobile: string;
  email: string;
  avatar?: string;
  usernameUpdated: string;
  createdTime: string;
  updatedTime: string;
}

export interface UserContextState {
  user: User;
  token: string | null;
}

export interface UserContext extends UserContextState {
  setToken(e: string | null): void;
  setUser(e: Partial<User>): void;
}
