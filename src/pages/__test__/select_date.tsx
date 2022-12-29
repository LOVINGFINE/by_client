/*
 * Created by zhangq on 2022/12/26
 * SelectDatePage
 */
import { FC, useEffect, useState } from "react";
import styles from "./style.less";
import { useClassNames } from "@/tools/style";
import {
  readMonthData,
  getMonthAttendanceDays,
  getYearMonths,
} from "./lib/utils";
import { Button, Spanging } from "@/packages/design";
import { uploadFile } from "@/tools/file";

const cn = useClassNames(styles);
const SelectDatePage: FC = () => {
  /** @State */
  const [year, setYear] = useState(2022);
  const [month, setMonth] = useState(1);

  const months = getYearMonths(year);
  /** @Effect */
  useEffect(() => {
    const current = new Date();
    setYear(current.getFullYear);
  }, []);

  /**
   * @Methods
   */
  function onClick() {}
  /** render */
  return (
    <div className={styles["select"]}>
      <ul className={styles["month-list"]}>
        {months.map((ele) => {
          return (
            <li className={styles["item"]} key={ele.value}>
              <span onClick={onClick} className={styles["item-label"]}>
                {ele.label}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SelectDatePage;
