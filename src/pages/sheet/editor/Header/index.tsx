/*
 * Created by zhangq on 2022/10/01
 * SheetHeader
 */
import { FC, useContext } from "react";
import styles from "./style.less";
import { globalContext } from "../index";
import { Button, Icon } from "@/packages/design";
import { useNavigate } from "react-router";

const SheetHeader: FC = () => {
  const navigate = useNavigate();
  const global = useContext(globalContext);

  /**
   * @Methods
   */
  function onBack() {
    navigate(-1);
  }
  /** render */
  return (
    <div className={styles["header"]}>
      <Icon name="sheet" size={28} />
      <span className={styles["header-name"]}>{global.name}</span>
    </div>
  );
};

export default SheetHeader;
