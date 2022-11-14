import "./style.less";
import { ReactElement } from "react";

export type MenuOptionDriver = "driver";

export interface MenuOption {
  label?: string | ReactElement;
  disabled?: boolean;
  type?: "default" | "error" | "warning";
  suffix?: string | number | ReactElement;
  icon?: string | number | ReactElement;
}

export interface MenuOptionChildren extends MenuOption {
  options?: (MenuOption | MenuOptionDriver)[];
}

import Menu from "./components/Menu";
import SubMenuItem from "./components/SubMenuItem";
import MenuItem from "./components/MenuItem";
import MenuDriver from "./components/MenuDriver";

export { MenuItem, MenuDriver, SubMenuItem };

export default Menu;
