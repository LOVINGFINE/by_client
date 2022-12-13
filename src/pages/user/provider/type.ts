import { User } from "../type";

export interface UserContextState {
  user: User;
  token: string | null;
}

export interface UserContext extends UserContextState {
  setToken(e: string | null): void;
  setUser(e: Partial<User>): void;
}
