/*
 * Created by zhangq on 2022/11/09
 * Template Item
 */
import { Icon } from "@/packages/design";
import { insertUserSheet } from "@/pages/sheet/apis";
import { FC } from "react";
import { useNavigate } from "react-router";
import styles from "../style.less";

const TemplateItem: FC<TemplateItemProps> = ({ id, title, img }) => {
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
        {img ? (
          <img src={img} />
        ) : (
          <Icon name={"plus"} style={{ color: "#ddd" }} size={35} />
        )}
      </div>
      <div className={styles["template-item-bottom"]}>{title}</div>
    </div>
  );
};

/**
 * @interface props
 */
export interface TemplateItemProps {
  id?: string;
  title: string;
  desc?: string;
  img?: string;
}

export default TemplateItem;
