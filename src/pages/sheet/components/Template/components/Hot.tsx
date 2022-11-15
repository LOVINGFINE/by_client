/*
 * Created by zhangq on 2022/11/09
 * TemplateHot
 */
import { FC } from "react";
import styles from "../style.less";
import TemplateItem from "./Item";
import { TemplateListItem } from "../type";

const TemplateHot: FC<TemplateHotProps> = ({ dataSource }) => {
  /** render */
  return (
    <div className={styles["hot"]}>
      <TemplateItem />
      {dataSource.map((item) => {
        return <TemplateItem id={item.id} title={item.title} key={item.id} />;
      })}
    </div>
  );
};

/**
 * @interface props
 */
export interface TemplateHotProps {
  dataSource: TemplateListItem[];
}

export default TemplateHot;
