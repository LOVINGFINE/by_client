/*
 * Created by zhangq on 2022/11/07
 *  item More actions
 */
import { FC } from "react";
import { Icon, Menu, Dropdown, Button } from "@/packages/design";
import { ListAction } from "./List";

const SheetMethods: FC<SheetMethodsProps> = ({ onAction }) => {
  /**
   * @Methods
   */
  const overlay = (
    <Menu
      style={{
        minWidth: 185,
      }}
    >
      <Menu.Item
        icon={<Icon name="rename" />}
        label={"修改标题"}
        onClick={() => onAction(ListAction.rename)}
      />
      <Menu.Item
        icon={<Icon name="external-link" />}
        label={`新窗口编辑`}
        onClick={() => onAction(ListAction.openBlank)}
      />
      <Menu.Item
        icon={<Icon name="trash-o" />}
        label={`删除`}
        onClick={() => onAction(ListAction.remove)}
      />
    </Menu>
  );

  /** render */
  return (
    <Dropdown overlay={overlay} placement="bottomLeft">
      <Button.Round>
        <Icon name="ellipsis-v" />
      </Button.Round>
    </Dropdown>
  );
};

/**
 * @interface props
 */
export interface SheetMethodsProps {
  onAction(e: ListAction): void;
}

export default SheetMethods;
