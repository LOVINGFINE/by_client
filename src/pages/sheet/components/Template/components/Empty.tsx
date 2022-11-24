/*
 * Created by zhangq on 2022/11/09
 * Template Item
 */
import { Icon } from "@/packages/design";
import { insertUserSheet } from "@/pages/sheet/apis";
import { SheetType } from "@/pages/sheet/type";
import { FC } from "react";
import { useNavigate } from "react-router";
import styles from "../style.less";

const TemplateItem: FC<TemplateItemProps> = ({ type }) => {
  const navigate = useNavigate();
  const title = (() => {
    if (type === SheetType.common) {
      return "空白电子表格";
    }
    return "空白meta表格";
  })();

  const description = (() => {
    if (type === SheetType.common) {
      return "";
    }
    return "";
  })();

  function onAddSheetByTemplate() {
    insertUserSheet("未命名标题", type).then((res) => {
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
        <Icon name={"plus"} style={{ color: "var(--d-desc)" }} size={38} />
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
  type: SheetType;
}

export default TemplateItem;