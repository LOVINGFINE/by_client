/*
 * Created by zhangq on 2022/12/26
 * index
 */
import { FC, useEffect, useState } from "react";
import styles from "./style.less";
import { useClassNames } from "@/tools/style";
import { readMonthData, getMonthAttendanceDays } from "./lib/utils";
import { Button, Spanging } from "@/packages/design";
import { uploadFile } from "@/tools/file";

const index: FC<indexProps> = ({}) => {
  /** @State */
  const [loading, setLoading] = useState(false);
  const attendance = getMonthAttendanceDays(2022, 10);
  /** @Effect */
  useEffect(() => {}, []);

  /**
   * @Methods
   */
  function loadMonth(file: File | File[]) {
    if (!Array.isArray(file)) {
      readMonthData(file, attendance.month_range).then((data) => {
        console.log(data);
      });
    }
  }
  /** render */
  return (
    <Spanging loading={loading}>
      <div className={styles["search"]}></div>
      <ul className={styles["list"]}></ul>
    </Spanging>
  );
};

/**
 * @interface props
 */
export interface indexProps {}

export default index;
