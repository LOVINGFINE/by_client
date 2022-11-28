import { FC, ReactElement, MouseEvent, CSSProperties } from "react";
import SubMenuItem from "./SubMenuItem";
import MenuItem from "./MenuItem";
import MenuDriver from "./MenuDriver";
import { MenuOptionChildren, MenuOptionDriver } from "./index";

const Menu: FC<MenuProps> = ({
  options = [],
  style = {},
  onClick,
  children,
}) => {
  const getItem = (
    item: MenuOptionChildren | MenuOptionDriver,
    index: number
  ) => {
    if (item === "driver") {
      return <MenuDriver key={`driver-${index}`} />;
    }
    if (Array.isArray(item.options)) {
      return (
        <SubMenuItem
          key={`sub-${index}`}
          {...item}
          onClick={onClick}
          options={item.options || []}
        />
      );
    }
    return <MenuItem key={`item-${index}`} {...item} onClick={onClick} />;
  };

  /**
   * @method
   */

  /** render */
  return (
    <ul className={`menu`} style={style}>
      {children}
      {options.map((ele, i) => getItem(ele, i))}
    </ul>
  );
};

export interface MenuProps {
  options?: (MenuOptionChildren | MenuOptionDriver)[];
  children?: ReactElement | ReactElement[];
  onClick?(e: MouseEvent): void;
  style?: CSSProperties;
}

export default Menu;
