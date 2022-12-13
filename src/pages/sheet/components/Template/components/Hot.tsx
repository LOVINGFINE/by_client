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

const TemplateHot: FC<TemplateHotProps> = ({
  dataSource,
  defaultTitle,
  full,
  onHide,
}) => {
  const navigate = useNavigate();

  /** @methods */
  function onOpenAll() {
    navigate({
      search: `?st=1`,
    });
  }

  const overlay = (
    <Menu
      style={{
        minWidth: 185,
      }}
    >
      <Menu.Item
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
              <Button.Round>
                <Icon name="ellipsis-v" />
              </Button.Round>
            </Dropdown>
          </div>
        )}
      </div>
      <div className={styles["hot-record"]}>
        <TemplateEmpty defaultTitle={defaultTitle} />
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
  defaultTitle: string;
}

export default TemplateHot;
