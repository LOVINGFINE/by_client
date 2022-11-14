/*
 * Created by zhangq on 2022/11/07
 * Toolbar
 */
import { FC } from "react";
import styles from "../style.less";
import { Icon, Button, Dropdown, Menu, Space } from "@/packages/design";
import { ListFilter, ListMode, ListSort, ActionOptions } from "../type";
import { MenuItem } from "@/packages/design/Menu";
import { FILTER_OPTIONS, SORT_OPTIONS } from "../final";

const Toolbar: FC<ToolbarProps> = ({
  filter,
  mode,
  sort,
  onMode,
  onSort,
  onFilter,
}) => {
  /**
   * @Methods
   */

  function getOptions<T extends string | number | symbol>(
    map: ActionOptions<T>
  ) {
    const list: {
      value: T;
      label: string;
      icon?: string;
    }[] = [];
    for (const value in map) {
      list.push({
        value,
        ...map[value],
      });
    }
    return list;
  }
  function onChangeListMode() {
    if (mode === ListMode.list) {
      onMode(ListMode.grid);
    } else {
      onMode(ListMode.list);
    }
  }

  function onUploadFile() {}

  const filterOverlay = (
    <Menu
      style={{
        minWidth: 185,
      }}
    >
      {getOptions<ListFilter>(FILTER_OPTIONS).map((ele) => {
        return (
          <MenuItem
            key={ele.value}
            icon={
              <Icon name={filter === ele.value ? "circle" : ""} size={10} />
            }
            label={
              <span className={styles["check-item"]}>
                {ele.icon && <Icon name={ele.icon} />}
                {ele.label}
              </span>
            }
            onClick={() => onFilter(ele.value)}
          />
        );
      })}
    </Menu>
  );

  const sortOverlay = (
    <Menu
      style={{
        minWidth: 185,
      }}
    >
      {getOptions<ListSort>(SORT_OPTIONS).map((ele) => {
        return (
          <MenuItem
            key={ele.value}
            icon={<Icon name={sort === ele.value ? "circle" : ""} size={10} />}
            label={
              <span className={styles["check-item"]}>
                {ele.icon && <Icon name={ele.icon} />}
                {ele.label}
              </span>
            }
            onClick={() => onSort(ele.value)}
          />
        );
      })}
    </Menu>
  );
  /** render */
  return (
    <div className={styles["toolbar"]}>
      <Space></Space>
      <Space
        style={{
          justifyContent: "flex-end",
        }}
      >
        <Dropdown overlay={sortOverlay} placement="bottomRight">
          <div className={styles["toolbar-width-label"]}>
            <Button round>
              <Icon name="sort" />
            </Button>
            {sort && <span>{SORT_OPTIONS[sort].label}</span>}
          </div>
        </Dropdown>
        <div className={styles["toolbar-driver"]} />
        <Dropdown overlay={filterOverlay} placement="bottomRight">
          <div className={styles["toolbar-width-label"]}>
            <Button round>
              <Icon name="filter" />
            </Button>
            <span>{FILTER_OPTIONS[filter].label}</span>
          </div>
        </Dropdown>
        <div className={styles["toolbar-driver"]} />
        <Button size="large" round onClick={onUploadFile}>
          <Icon name={"folder-open"} />
        </Button>
        <Button size="large" round onClick={onChangeListMode}>
          <Icon name={`data-${mode}`} />
        </Button>
      </Space>
    </div>
  );
};

/**
 * @interface props
 */
export interface ToolbarProps {
  mode: ListMode;
  sort: ListSort;
  filter: ListFilter;
  onFilter(e: ListFilter): void;
  onSort(e: ListSort): void;
  onMode(e: ListMode): void;
}

export default Toolbar;
