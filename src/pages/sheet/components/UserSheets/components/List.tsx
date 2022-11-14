/*
 * Created by zhangq on 2022/11/07
 * sheet list
 */
import { FC, useContext } from "react";
import { ListMode } from "../type";
import styles from "../style.less";
import { SheetListItem } from "@/pages/sheet/editor";
import SheetMoreAction from "./More";
import dayjs from "dayjs";
import { userContext } from "@/plugins/user";
import { useNavigate } from "react-router";
import { Icon } from "@/packages/design";

const List: FC<ListProps> = ({ dataSource, onRename, onRemove, listMode }) => {
  const navigate = useNavigate();
  const context = useContext(userContext);

  /** @State */
  const getOwner = (item: SheetListItem) => {
    if (context.user.id === item.owner) {
      return "我";
    }
    return "其他人分享";
  };

  const getUpdateTime = (item: SheetListItem) => {
    return dayjs(item.updatedTime).format("YYYY年M月D日 HH:mm");
  };

  /**
   * @Methods
   */
  function onItemAction(action: ListAction, item: SheetListItem) {
    switch (action) {
      case ListAction.openBlank: {
        window.open(`/sheets/${item.id}`, "_blank");
        break;
      }
      case ListAction.rename: {
        onRename(item);
        break;
      }
      case ListAction.remove: {
        onRemove(item);
        break;
      }
    }
  }
  function onEdit(item: SheetListItem) {
    navigate(`/sheets/${item.id}`);
  }
  const sheetsList = (
    <ul className={styles["sheets-list"]}>
      {dataSource.map((item) => {
        return (
          <li
            key={item.id}
            className={styles[`listItem`]}
            onClick={() => onEdit(item)}
          >
            <Icon name="sheet" size={20} />
            <span className={styles[`listItem-name`]}>{item.name}</span>
            <span className={styles[`listItem-isOwner`]}>{getOwner(item)}</span>
            <span className={styles[`listItem-updateTime`]}>
              {getUpdateTime(item)}
            </span>
            <span onClick={(e) => e.stopPropagation()}>
              <SheetMoreAction onAction={(k) => onItemAction(k, item)} />
            </span>
          </li>
        );
      })}
    </ul>
  );

  const sheetGrid = (
    <ul className={styles["sheets-grid"]}>
      {dataSource.map((item) => {
        return (
          <li
            key={item.id}
            className={styles[`gridItem`]}
            onClick={() => onEdit(item)}
          >
            <div className={styles[`gridItem-display`]}></div>
            <div className={styles[`gridItem-row`]}>
              <Icon name="sheet" size={18} />
              <span className={styles[`data-gridItem-name`]}>{item.name}</span>
            </div>
            <div className={styles[`gridItem-row`]}>
              <span className={styles[`gridItem-updateTime`]}>
                {getUpdateTime(item)}
              </span>
              <span onClick={(e) => e.stopPropagation()}>
                <SheetMoreAction onAction={(k) => onItemAction(k, item)} />
              </span>
            </div>
          </li>
        );
      })}
    </ul>
  );
  /** render */
  return listMode === ListMode.grid ? sheetGrid : sheetsList;
};

/**
 * @interface props
 */
export interface ListProps {
  dataSource: SheetListItem[];
  listMode: ListMode;
  onRename(e: SheetListItem): void;
  onRemove(e: SheetListItem): void;
}

export enum ListAction {
  rename = "rename",
  remove = "remove",
  openBlank = "openBlank",
}
export default List;