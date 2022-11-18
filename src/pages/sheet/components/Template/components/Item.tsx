/*
 * Created by zhangq on 2022/11/09
 * Template Item
 */
import { Icon } from "@/packages/design";
import { insertUserSheet } from "@/pages/sheet/apis";
import { FC } from "react";
import { useNavigate } from "react-router";
import styles from "../style.less";

const TemplateItem: FC<TemplateItemProps> = ({
  id,
  title = "空白表格",
  img = "",
  description = "",
}) => {
  const navigate = useNavigate();

  function onAddSheetByTemplate() {
    if (id) {
    } else {
      insertUserSheet("未命名标题").then((res) => {
        navigate(`/sheets/${res.id}`);
      });
    }
  }

  /** @render */
  return (
    <div className={styles["template-item"]}>
      <div
        className={styles["template-item-card"]}
        onClick={onAddSheetByTemplate}
      >
        {!id ? (
          <Icon name={"plus"} style={{ color: "var(--d-desc)" }} size={38} />
        ) : (
          img && <img src={img} />
        )}
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
  id?: string;
  title?: string;
  description?: string;
  img?: string;
}

export default TemplateItem;
