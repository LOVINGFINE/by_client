export interface User {
  id: string;
  username: string;
  nickname: string;
  mobile: string;
  email: string;
  avatar?: string;
}

export interface UserContextState {
  user: User;
  token: string | null;
  setToken(e: string | null): void;
}
