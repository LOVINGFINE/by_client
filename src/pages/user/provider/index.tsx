import { ReactElement, FC, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { userInfoWidthToken } from "../apis";
import { UserContext } from "./type";
import { User } from "../type";
import { createStorageRef } from "@/plugins/storage";
import { createContext } from "react";

const accessToken = createStorageRef<string>("access-token");

export const userContext = createContext<UserContext>({} as UserContext);

const Provider: FC<{
  children?: ReactElement | ReactElement[];
  neglect?: string[];
}> = ({ children, neglect = [] }) => {
  const navigate = useNavigate();
  const route = useLocation();
  const [user, setUserState] = useState<User>({
    id: "",
    username: "",
    nickname: "",
    mobile: "",
    email: "",
    usernameUpdated: "",
    updatedTime: "",
    createdTime: "",
    passwordUpdated: "",
  });
  const [token, setTokenValue] = useState<string | null>(null);
  const ignore = neglect.includes(route.pathname);

  useEffect(() => {
    if (!ignore) {
      if (accessToken.get()) {
        setTokenValue(accessToken.get());
      } else {
        navigate("/sign-in", {
          replace: true,
        });
      }
    }
  }, [ignore]);

  useEffect(() => {
    if (!ignore && token) {
      userInfoWidthToken()
        .then((res) => {
          setUser(res);
        })
        .catch(() => {
          navigate("/sign-in", {
            replace: true,
          });
        });
    }
  }, [token]);

  function setToken(e: string) {
    setTokenValue(e);
    accessToken.set(e);
  }

  function setUser(e: Partial<User>) {
    setUserState({
      ...user,
      ...e,
    });
  }
  return (
    <userContext.Provider
      value={{
        user,
        token,
        setToken,
        setUser,
      }}
    >
      {children}
    </userContext.Provider>
  );
};
export * from "./type";

export default Provider;
