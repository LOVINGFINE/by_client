/*
 * Created by zhangq on 2022/11/09
 * CategoryWithRecord
 */
import { FC } from "react";
import styles from "../style.less";
import TemplateItem from "./Item";
import { CategoryRecord } from "../type";

const CategoryWithRecord: FC<CategoryWithRecordProps> = ({
  title,
  records,
  description,
}) => {
  /** render */
  return (
    <div className={styles["category"]}>
      <div className={styles["category-title"]}>
        {title}
        <span className={styles["category-desc"]}>{description}</span>
      </div>
      <div className={styles["category-record"]}>
        {records.map((item) => {
          return <TemplateItem id={item.id} title={item.title} key={item.id} />;
        })}
      </div>
    </div>
  );
};

/**
 * @interface props
 */
export interface CategoryWithRecordProps extends CategoryRecord {}

export default CategoryWithRecord;
