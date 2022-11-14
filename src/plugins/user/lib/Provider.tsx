import { ReactElement, FC, useEffect, useState } from "react";
import { userInfoWidthToken } from "./api";
import context from "./context";
import { User } from "./type";
import { useLocation } from "react-router";
import { createStorageRef } from "@/plugins/storage";

const accessToken = createStorageRef<string>("access-token");

const Provider: FC<{
  children?: ReactElement | ReactElement[];
  neglect?: string[];
}> = ({ children, neglect = [] }) => {
  const route = useLocation();
  const [user, setUser] = useState<User>({
    id: "",
    username: "",
    nickname: "",
    mobile: "",
    email: "",
  });
  const [token, setTokenValue] = useState<string | null>(null);

  useEffect(() => {
    setTokenValue(accessToken.get() || "");
  }, []);

  useEffect(() => {
    if (!neglect.includes(route.pathname) && token !== null) {
      userInfoWidthToken().then((res) => {
        setUser(res);
      });
    }
  }, [token]);

  function setToken(e: string) {
    setTokenValue(e);
    accessToken.set(e);
  }
  return (
    <context.Provider
      value={{
        user,
        token,
        setToken,
      }}
    >
      {children}
    </context.Provider>
  );
};

export default Provider;
