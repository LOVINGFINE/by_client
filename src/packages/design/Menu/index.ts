import "./style.less";
import { ReactElement } from "react";

export type MenuOptionDriver = "driver";

export enum MenuOptionType {
  default = "default",
  error = "error",
  warning = "warning",
}

export interface MenuOption {
  label: string;
  disabled?: boolean;
  type?: MenuOptionType;
  icon?: string;
  suffix?: ReactElement;
  options?: (MenuOption | MenuOptionDriver)[];
}

import Menu from "./components/Menu";
import SubMenuItem from "./components/SubMenuItem";
import MenuItem from "./components/MenuItem";
import MenuDriver from "./components/MenuDriver";

export { MenuItem, MenuDriver, SubMenuItem };

export default Menu;
