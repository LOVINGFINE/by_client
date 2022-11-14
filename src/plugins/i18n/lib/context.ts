import { createContext } from "react";
import { LocaleProps } from "./type";

const context = createContext<LocaleProps>({
  locale: "",
  dataSource: {},
  options: [],
  set: () => {},
  t: () => "",
});

export default context;
