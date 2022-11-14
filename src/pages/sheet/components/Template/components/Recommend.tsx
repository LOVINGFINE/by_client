/*
 * Created by zhangq on 2022/11/09
 * TemplateRecommend
 */
import { FC } from "react";
import styles from "../style.less";
import TemplateItem from "./Item";
import { TemplateListItem } from "../type";

const TemplateRecommend: FC<TemplateRecommendProps> = ({ dataSource }) => {
  /** render */
  return (
    <div className={styles["recommend"]}>
      <TemplateItem title={"空白表格"} />
      {dataSource.map((item) => {
        return <TemplateItem id={item.id} title={item.title} key={item.id} />;
      })}
    </div>
  );
};

/**
 * @interface props
 */
export interface TemplateRecommendProps {
  dataSource: TemplateListItem[];
}

export default TemplateRecommend;
