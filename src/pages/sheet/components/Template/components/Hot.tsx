/*
 * Created by zhangq on 2022/11/09
 * TemplateHot
 */
import { FC } from "react";
import styles from "../style.less";
import TemplateItem from "./Item";
import TemplateEmpty from "./Empty";
import { TemplateListItem } from "../type";
import { Button, Dropdown, Icon, Menu } from "@/packages/design";
import { useNavigate } from "react-router";
import { MenuItem } from "@/packages/design/Menu";
import { SheetType } from "@/pages/sheet/type";

const TemplateHot: FC<TemplateHotProps> = ({ dataSource, full, onHide }) => {
  const navigate = useNavigate();

  /** @methods */
  function onOpenAll() {
    navigate(`/sheets?st=1`);
  }

  const overlay = (
    <Menu
      style={{
        minWidth: 185,
      }}
    >
      <MenuItem
        icon={<Icon name="eye-slash" />}
        label={"隐藏模版库"}
        onClick={onHide}
      />
    </Menu>
  );
  /** render */
  return (
    <div className={styles["hot"]}>
      <div className={styles["hot-toolbar"]}>
        <div className={styles["hot-toolbar-left"]}>
          {full ? "推荐模版" : "新建电子表格"}
        </div>
        {!full && (
          <div className={styles["hot-toolbar-right"]}>
            <div
              onClick={onOpenAll}
              className={styles["hot-toolbar-right-btn"]}
            >
              模版库 <Icon name={`sort`} />
            </div>
            <Dropdown overlay={overlay} placement="bottomLeft">
              <Button round>
                <Icon name="ellipsis-v" />
              </Button>
            </Dropdown>
          </div>
        )}
      </div>
      <div className={styles["hot-record"]}>
        <TemplateEmpty type={SheetType.common} />
        <TemplateEmpty type={SheetType.meta} />
        {dataSource.map((item) => {
          return <TemplateItem id={item.id} title={item.title} key={item.id} />;
        })}
      </div>
    </div>
  );
};

/**
 * @interface props
 */
export interface TemplateHotProps {
  dataSource: TemplateListItem[];
  full: boolean;
  onHide(): void;
}

export default TemplateHot;
