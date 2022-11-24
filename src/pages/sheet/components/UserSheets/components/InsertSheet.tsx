/*
 * Created by zhangq on 2022/11/16
 * InsertSheet
 */
import { FC } from "react";
import styles from "../style.less";
import { insertUserSheet } from "@/pages/sheet/apis";
import { useNavigate } from "react-router";
import { Icon, Tooltip } from "@/packages/design";
import { SheetType } from "@/pages/sheet/type";

const InsertSheet: FC = () => {
  const navigate = useNavigate();
  /**
   * @Methods
   */
  function insertEmptySheet(type: SheetType) {
    insertUserSheet("未命名标题", type).then((res) => {
      navigate(`/sheets/${res.id}`);
    });
  }

  function navToTemplate() {
    navigate("/sheets?st=1");
  }
  /** render */
  return (
    <div className={styles["insertSheet"]}>
      <div className={styles["insertSheet-openTemplate"]}>
        <Tooltip title={"模版库"} delay={0.5} placement="left">
          <div
            className={styles["insertSheet-openTemplate-btn"]}
            onClick={navToTemplate}
          >
            <Icon name="file" />
          </div>
        </Tooltip>
        <Tooltip title={"新建空白meta表格"} delay={0.5} placement="left">
          <div
            className={styles["insertSheet-openTemplate-btn"]}
            onClick={() => insertEmptySheet(SheetType.meta)}
          >
            <Icon name="meta-sheet" />
          </div>
        </Tooltip>
      </div>
      <div className={styles["insertSheet-plus"]}>
        <Icon name="plus" />
      </div>
      <Tooltip title={"新建空白电子表格"} delay={0.5} placement="left">
        <div
          className={styles["insertSheet-empty"]}
          onClick={() => insertEmptySheet(SheetType.common)}
        >
          <Icon name="sheet" />
        </div>
      </Tooltip>
    </div>
  );
};

export default InsertSheet;
