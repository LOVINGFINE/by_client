import { createContext } from "react";
import { UserContextState } from "./type";

interface UserContext extends UserContextState {}
const context = createContext<UserContext>({
  user: {
    id: "",
    username: "",
    nickname: "",
    mobile: "",
    email: "",
  },
  token: null,
  setToken: (e: string) => e,
});

export default context;
