/*
 * Created by zhangq on 2022/11/07
 * style
 */
import { FC, useEffect, useRef, useState, useContext } from "react";
import styles from "./style.less";
import { userContext } from "@/plugins/user";
import { Spanging } from "@/packages/design";
import {
  SheetListItem,
  ListFilter,
  ListMode,
  ListSort,
} from "@/pages/sheet/type";
import UserSheetsToolbar from "./components/Toolbar";
import SheetList from "./components/List";
import { deleteUserSheet, getUserSheets } from "../../apis";
import RenameModal, { RenameModalRef } from "./components/Rename";
import dayjs from "dayjs";
import UserSheetsEmpty from "./components/Empty";

const UserSheets: FC<UserSheetsProps> = ({ search, hide }) => {
  const context = useContext(userContext);

  /** @State */
  const [loading, setLoading] = useState(true);
  const [userSheets, setUserSheets] = useState<SheetListItem[]>([]);
  const [listMode, setListMode] = useState<ListMode>(ListMode.list);
  const [listSort, setListSort] = useState<ListSort>(ListSort.openDate);
  const [listFilter, setListFilter] = useState<ListFilter>(ListFilter.none);

  // 重命名
  const renameRef = useRef<RenameModalRef>(null);

  const displayUserSheets = (() => {
    let list = [...userSheets];
    // 排序
    if (listSort === ListSort.openDate) {
      list.sort((f, b) => {
        return dayjs(f.lastOpenTime).isAfter(b.lastOpenTime) ? -1 : 1;
      });
    }
    if (listSort === ListSort.editDate) {
      list.sort((f, b) => {
        return dayjs(f.updatedTime).isAfter(b.updatedTime) ? -1 : 1;
      });
    }
    // 过滤
    if (listFilter === ListFilter.createByMe) {
      list = list.filter((ele) => {
        return context.user.id === ele.owner;
      });
    }

    if (listFilter === ListFilter.shareToMe) {
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
  const getOwner = (item: SheetListItem) => {
    if (context.user.id === item.owner) {
      return "我";
    }
    return "其他人分享";
  };

  const getTime = (item: SheetListItem) => {
    if (listSort === ListSort.openDate) {
      return dayjs(item.lastOpenTime).format("YYYY年M月D日 HH:mm");
    }
    if (listSort === ListSort.editDate) {
      return dayjs(item.updatedTime).format("YYYY年M月D日 HH:mm");
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

  function onSheetRename(e: SheetListItem) {
    renameRef.current?.focus(e);
  }

  function onSheetRemove(item: SheetListItem) {
    deleteUserSheet(item.id).then(() => {
      initSheets();
    });
  }

  function onMode(e: ListMode) {
    setLoading(true);
    setTimeout(() => {
      setListMode(e);
      setLoading(false);
    }, 200);
  }
  /** render */
  return (
    <div className={`${styles["userSheets"]} ${styles[`userSheets-${hide}`]}`}>
      <RenameModal ref={renameRef} onOk={initSheets} />
      {!hide && (
        <>
          <UserSheetsToolbar
            mode={listMode}
            sort={listSort}
            filter={listFilter}
            onSort={setListSort}
            onMode={onMode}
            onFilter={setListFilter}
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
                  listMode={listMode}
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
  hide: boolean;
}

export default UserSheets;
