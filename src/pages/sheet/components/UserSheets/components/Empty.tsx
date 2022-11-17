/*
 * Created by zhangq on 2022/11/07
 * UserSheetsEmpty
 */
import { FC } from "react";
import styles from "../style.less";

const UserSheetsEmpty: FC<UserSheetsEmptyProps> = ({}) => {
  /** render */
  return (
    <div className={styles["userSheets-empty"]}>
      <div className={styles["userSheets-empty-title"]}>当前暂无表格</div>
      <div className={styles["userSheets-empty-desc"]}>
        点击 “+” 创建空白表格、选择模版库中创建、导入本地文件
      </div>
    </div>
  );
};

/**
 * @interface props
 */
export interface UserSheetsEmptyProps {
  onCreate?(): void;
}

export default UserSheetsEmpty;
