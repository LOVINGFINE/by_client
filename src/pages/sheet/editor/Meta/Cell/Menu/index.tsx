import { FC, MouseEvent } from "react";

import Menu, {
  MenuItem,
  SubMenuItem,
  MenuDriver,
} from "@/packages/design/Menu";
import { KeyboardType } from "@/plugins/event";
import { Icon } from "@/packages/design";
import { Selection } from "@/packages/table";
import SuffixTip from "./suffix";
import platform, { OsType } from "@/plugins/platform";
import { CellMenuKey } from "../../type";

const { CLEAR, COPY, PASTE, REMOVE_COLUMN, REMOVE_ENTRY } = CellMenuKey;
const ContextMenu: FC<CellMenuProps> = (props) => {
  const { onAction } = props;

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
      <SubMenuItem label={`清除单元格`} icon={<Icon name="trash-o" />}>
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
      <MenuItem
        icon={<Icon name="edit-remove-col" />}
        label={`删除列`}
        onClick={() => onAction(REMOVE_COLUMN)}
      />
      <MenuItem
        icon={<Icon name="edit-remove-row" />}
        label={`删除行`}
        onClick={() => onAction(REMOVE_ENTRY)}
      />
    </Menu>
  );
};

interface CellMenuProps {
  onAction(k: CellMenuKey, e?: unknown): void;
  selection: Selection;
}

export default ContextMenu;
