import { useContext } from "react";
import context from "./context";

export const useLocale = () => {
  const state = useContext(context);
  return {
    ...state,
  };
};
