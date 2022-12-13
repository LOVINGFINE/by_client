import { FC } from "react";
import { Switch } from "@/packages/design";
import styles from "../style.less";

const ShowRowCount: FC<{
  value: boolean;
  onChange(v: boolean): void;
}> = ({ value, onChange }) => {
  /** render */
  return (
    <div className={styles['showRowCount']}>
      <span>显示序号</span>
      <Switch size="small" checked={value} onChange={onChange} />
    </div>
  );
};

export default ShowRowCount;
