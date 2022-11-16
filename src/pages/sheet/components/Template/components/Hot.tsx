/*
 * Created by zhangq on 2022/11/09
 * TemplateHot
 */
import { FC } from "react";
import styles from "../style.less";
import TemplateItem from "./Item";
import { TemplateListItem } from "../type";
import { Icon } from "@/packages/design";
import { useNavigate } from "react-router";

const TemplateHot: FC<TemplateHotProps> = ({ dataSource, full }) => {
  const navigate = useNavigate();

  /** @methods */
  function onOpenAll() {
    navigate(`/sheets?st=1`);
  }

  /** render */
  return (
    <div className={styles["hot"]}>
      <div className={styles["hot-toolbar"]}>
        <div className={styles["hot-toolbar-left"]}>
          {full ? "推荐模版" : "新建电子表格"}
        </div>
        <div className={styles["hot-toolbar-right"]}>
          {!full && (
            <div
              onClick={onOpenAll}
              className={styles["hot-toolbar-right-btn"]}
            >
              模版库 <Icon name={`sort`} />
            </div>
          )}
        </div>
      </div>
      <div className={styles["hot-record"]}>
        <TemplateItem />
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
}

export default TemplateHot;
