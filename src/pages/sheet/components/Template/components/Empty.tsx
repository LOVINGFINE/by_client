/*
 * Created by zhangq on 2022/11/09
 * Template Item
 */
import { Icon } from "@/packages/design";
import { insertUserSheet } from "@/pages/sheet/apis";
import { FC } from "react";
import { useNavigate } from "react-router";
import styles from "../style.less";

const TemplateEmpty: FC<TemplateEmptyProps> = ({ defaultTitle }) => {
  const navigate = useNavigate();
  const icon = "sheet";
  const title = "空白表格";

  const description = "";

  function onAddSheetByTemplate() {
    insertUserSheet(defaultTitle ?? "未命名标题").then((res) => {
      navigate(`/sheets/${res.id}`);
    });
  }

  /** @render */
  return (
    <div className={styles["template-item"]}>
      <div
        className={styles["template-item-card"]}
        onClick={onAddSheetByTemplate}
      >
        <Icon name={icon} size={65} />
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
export interface TemplateEmptyProps {
  defaultTitle: string;
}

export default TemplateEmpty;
