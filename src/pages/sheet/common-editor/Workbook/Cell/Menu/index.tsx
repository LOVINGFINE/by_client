import { FC, MouseEvent } from "react";

import Menu, {
  MenuItem,
  SubMenuItem,
  MenuDriver,
} from "@/packages/design/Menu";
import { KeyboardType } from "@/plugins/event";
import { Icon } from "@/packages/design";
import { Selection } from "@/packages/table";
import { getSelectionRef } from "../../RefTool/utils";

import SuffixTip from "./suffix";
import platform, { OsType } from "@/plugins/platform";
import { CellMenuKey } from "../../type";


const {
  CLEAR,
  COPY,
  INSERT_COLUMN,
  INSERT_ROW,
  PASTE,
  REMOVE_COLUMN,
  REMOVE_ROW,
} = CellMenuKey;
const ContextMenu: FC<CellMenuProps> = (props) => {
  const { onAction, selection } = props;
  const selectionRef = getSelectionRef(selection);

  const metaKeyIcon = (() => {
    if (platform.os === OsType.MacOS) {
      return "command";
    }
    return "angle-up";
  })();

  function onPaste(e: MouseEvent) {
    const { paste_cut, paste } = KeyboardType;
    if (e.altKey) {
      onAction(PASTE, paste_cut);
    } else {
      onAction(PASTE, paste);
    }
  }

  function onMoreInsert() {}

  /** render */
  return (
    <Menu>
      <MenuItem
        icon={<Icon name="edit-copy" />}
        label={"拷贝"}
        onClick={() => onAction(COPY)}
        suffix={<SuffixTip icon={metaKeyIcon} label="C" />}
      />
      <MenuItem
        icon={<Icon name="edit-paste" />}
        label={"粘贴"}
        onClick={onPaste}
        suffix={<SuffixTip icon={metaKeyIcon} label="V" />}
      />
      <SubMenuItem
        label={`清除单元格 ${selectionRef.cellRef}`}
        icon={<Icon name="trash-o" />}
      >
        <MenuItem
          icon={<Icon name="close" />}
          label={"仅清除数据"}
          onClick={() => onAction(CLEAR, true)}
        />
        <MenuItem
          icon={<Icon name="long-arrow-up" />}
          label={"全部清除"}
          onClick={() => onAction(CLEAR, false)}
        />
      </SubMenuItem>
      <MenuDriver />
      <SubMenuItem icon={<Icon name="plus" />} label="添加行">
        <MenuItem
          icon={<Icon name="long-arrow-up" />}
          label={"在上方添加一行"}
          onClick={() =>
            onAction(INSERT_ROW, {
              position: "before",
              count: 1,
            })
          }
        />
        <MenuItem
          icon={<Icon name="long-arrow-down" />}
          label={"在下方添加一行"}
          onClick={() =>
            onAction(INSERT_ROW, {
              position: "after",
              count: 1,
            })
          }
        />
        <MenuItem
          icon={<Icon name="ellipsis-v" />}
          label={"更多"}
          onClick={() => onMoreInsert()}
        />
      </SubMenuItem>
      <SubMenuItem icon={<Icon name="plus" />} label="添加列">
        <MenuItem
          icon={<Icon name="long-arrow-left" />}
          label={"在前方添加一列"}
          onClick={() =>
            onAction(INSERT_COLUMN, {
              position: "before",
              count: 1,
            })
          }
        />
        <MenuItem
          icon={<Icon name="long-arrow-right" />}
          label={"向后方添加一列"}
          onClick={() =>
            onAction(INSERT_COLUMN, {
              position: "after",
              count: 1,
            })
          }
        />
        <MenuItem
          icon={<Icon name="ellipsis-v" />}
          label={"更多"}
          onClick={() => onMoreInsert()}
        />
      </SubMenuItem>
      <MenuDriver />
      <MenuItem
        icon={<Icon name="edit-remove-col" />}
        label={`删除列 ${selectionRef.columnRef}`}
        onClick={() => onAction(REMOVE_COLUMN)}
      />
      <MenuItem
        icon={<Icon name="edit-remove-row" />}
        label={`删除行 ${selectionRef.rowRef}`}
        onClick={() => onAction(REMOVE_ROW)}
      />
    </Menu>
  );
};

interface CellMenuProps {
  onAction(k: CellMenuKey, e?: unknown): void;
  selection: Selection;
}

export default ContextMenu;
