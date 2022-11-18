import { ReactElement, FC, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { userInfoWidthToken } from "./api";
import context from "./context";
import { User } from "./type";
import { createStorageRef } from "@/plugins/storage";

const accessToken = createStorageRef<string>("access-token");

const Provider: FC<{
  children?: ReactElement | ReactElement[];
  neglect?: string[];
}> = ({ children, neglect = [] }) => {
  const navigate = useNavigate();
  const route = useLocation();
  const [user, setUser] = useState<User>({
    id: "",
    username: "",
    nickname: "",
    mobile: "",
    email: "",
  });
  const [token, setTokenValue] = useState<string | null>(null);
  const ignore = neglect.includes(route.pathname);
  useEffect(() => {
    if (accessToken.get()) {
      setTokenValue(accessToken.get());
    } else {
      if (!ignore) {
        navigate("/sign-in", {
          replace: true,
        });
      }
    }
  }, []);

  useEffect(() => {
    if (token) {
      userInfoWidthToken()
        .then((res) => {
          setUser(res);
        })
        .catch(() => {
          if (!ignore) {
            navigate("/sign-in", {
              replace: true,
            });
          }
        });
    } else {
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
