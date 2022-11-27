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

const TemplateItem: FC<TemplateItemProps> = ({ type, defaultTitle }) => {
  const navigate = useNavigate();
  const icon = (() => {
    if (type === SheetType.common) {
      return "sheet";
    }
    return "meta-sheet";
  })();

  const title = (() => {
    if (type === SheetType.common) {
      return "空白普通表格";
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
    insertUserSheet(defaultTitle ?? "未命名标题", type).then((res) => {
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
export interface TemplateItemProps {
  type: SheetType;
  defaultTitle: string;
}

export default TemplateItem;
