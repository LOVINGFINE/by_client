/*
 * Created by zhangq on 2022/11/16
 * InsertSheet
 */
import { FC, useEffect } from "react";
import styles from "../style.less";
import { insertUserSheet } from "@/pages/sheet/apis";
import { useNavigate } from "react-router";
import { Icon } from "@/packages/design";

const InsertSheet: FC = () => {
  const navigate = useNavigate();
  /**
   * @Methods
   */
  function insertEmptySheet() {
    insertUserSheet("未命名标题").then((res) => {
      navigate(`/sheets/${res.id}`);
    });
  }
  /** render */
  return (
    <div className={styles["insertSheet"]} onClick={insertEmptySheet}>
      <Icon name="plus" size={18} />
    </div>
  );
};

export default InsertSheet;
