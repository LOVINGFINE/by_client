import { ReactElement, FC } from "react";
import styles from "../style.less";
const Driver: FC<{
  height?: number;
}> = ({ height = 16 }): ReactElement => {
  /** render */
  return <span className={styles["driver"]} style={{ height }} />;
};

export default Driver;
