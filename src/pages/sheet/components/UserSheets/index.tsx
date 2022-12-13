/*
 * Created by zhangq on 2022/11/07
 * style
 */
import { FC, useEffect, useRef, useState, useContext } from "react";
import dayjs from "dayjs";
import styles from "./style.less";

import UserSheetsToolbar from "./components/Toolbar";
import SheetList from "./components/List";
import RenameModal, { RenameModalRef } from "./components/Rename";
import UserSheetsEmpty from "./components/Empty";
import InsertSheet from "./components/InsertSheet";

import { userContext } from "@/pages/user/provider";
import { Spanging } from "@/packages/design";
import {
  Sheet,
  ListFilter,
  ListMode,
  ListSort,
  SheetUserSettings,
} from "@/pages/sheet/type";
import { deleteUserSheet, getUserSheets } from "../../apis";

const UserSheets: FC<UserSheetsProps> = ({
  search,
  display,
  onSettings,
  settings,
}) => {
  const context = useContext(userContext);
  const { mode, filter, sort } = settings;
  /** @State */
  const [loading, setLoading] = useState(true);
  const [userSheets, setUserSheets] = useState<Sheet[]>([]);

  // 重命名
  const renameRef = useRef<RenameModalRef>(null);

  const displayUserSheets = (() => {
    let list = [...userSheets];
    // 排序
    if (sort === ListSort.openDate) {
      list.sort((f, b) => {
        return dayjs(f.lastOpenTime).isAfter(b.lastOpenTime) ? -1 : 1;
      });
    }
    if (sort === ListSort.editDate) {
      list.sort((f, b) => {
        return dayjs(f.updatedTime).isAfter(b.updatedTime) ? -1 : 1;
      });
    }
    // 过滤
    if (filter === ListFilter.createByMe) {
      list = list.filter((ele) => {
        return context.user.id === ele.owner;
      });
    }

    if (filter === ListFilter.shareToMe) {
      list = list.filter((ele) => {
        return (
          context.user.id !== ele.owner && ele.share.includes(context.user.id)
        );
      });
    }
    return list;
  })();
  /**
   * @effect
   */
  useEffect(() => {
    initSheets();
  }, [search]);

  /** @Method */
  const getOwner = (item: Sheet) => {
    if (context.user.id === item.owner) {
      return "我";
    }
    return "其他人分享";
  };

  const getTime = (item: Sheet) => {
    if (sort === ListSort.openDate) {
      return dayjs(item.lastOpenTime).format("M月D日 HH:mm");
    }
    if (sort === ListSort.editDate) {
      return dayjs(item.updatedTime).format("M月D日 HH:mm");
    }
    return "";
  };

  function initSheets() {
    setLoading(true);
    getUserSheets(search)
      .then((res) => {
        setUserSheets(res);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function onSheetRename(e: Sheet) {
    renameRef.current?.focus(e);
  }

  function onSheetRemove(item: Sheet) {
    deleteUserSheet(item.id).then(() => {
      initSheets();
    });
  }

  function onMode(e: ListMode) {
    setLoading(true);
    setTimeout(() => {
      onSettings({
        mode: e,
      });
      setLoading(false);
    }, 200);
  }

  function onSort(e: ListSort) {
    onSettings({
      sort: e,
    });
  }

  function onFilter(e: ListFilter) {
    onSettings({
      filter: e,
    });
  }

  /** render */
  return (
    <div
      className={`${styles["userSheets"]} ${styles[`userSheets-${display}`]}`}
    >
      {display === "hide" && <InsertSheet title={settings.defaultTitle} />}
      <RenameModal ref={renameRef} onOk={initSheets} />
      {display !== "full" && (
        <>
          <UserSheetsToolbar
            mode={mode}
            sort={sort}
            filter={filter}
            onSort={onSort}
            onMode={onMode}
            onFilter={onFilter}
          />
          <div className={styles["userSheets-content"]}>
            <Spanging loading={loading} type="alternate" size="small">
              {displayUserSheets.length === 0 ? (
                <UserSheetsEmpty />
              ) : (
                <SheetList
                  onRemove={onSheetRemove}
                  onRename={onSheetRename}
                  getTime={getTime}
                  getOwner={getOwner}
                  dataSource={displayUserSheets}
                  mode={mode}
                />
              )}
            </Spanging>
          </div>
        </>
      )}
    </div>
  );
};

/**
 * @interface props
 */
export interface UserSheetsProps {
  search: string;
  display: "full" | "hide" | "normal";
  settings: SheetUserSettings;
  onSettings(p: Partial<SheetUserSettings>): void;
}

export default UserSheets;
