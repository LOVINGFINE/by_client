/*
 * Created by zhangq on 2022/11/09
 * Template Item
 */
import { FC } from "react";

import styles from "../style.less";

const TemplateItem: FC<TemplateItemProps> = ({
  title = "空白表格",
  img = "",
  description = "",
}) => {
  function onAddSheetByTemplate() {}

  /** @render */
  return (
    <div className={styles["template-item"]}>
      <div
        className={styles["template-item-card"]}
        onClick={onAddSheetByTemplate}
      >
        {img && <img src={img} />}
      </div>
      <div className={styles["template-item-bottom"]}>
        <div className={styles["template-item-bottom-title"]}>{title}</div>
        <div className={styles["template-item-bottom-desc"]}>{description}</div>
      </div>
    </div>
  );
};

/**
 * @interface props
 */
export interface TemplateItemProps {
  id: string;
  title: string;
  description?: string;
  img?: string;
}

export default TemplateItem;
