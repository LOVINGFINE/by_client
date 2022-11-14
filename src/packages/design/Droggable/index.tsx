/*
 * Created by zhangq on 2022/11/03
 * style
 */
import React, { FC, ReactElement, useEffect } from "react";
import styles from "./style.less";

const Draggle: FC<DraggleProps> = ({ children }) => {
  /** @State */

  const elements = (() => {
    if (Array.isArray(children)) {
      return children.map((ele) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let clone: any = ele;
        if (ele?.type !== "string") {
          clone = clone?.type(clone.props);
        }
        return React.cloneElement(clone || <></>, {
          dataDrop: true,
        });
      });
    }
    if (children) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let clone: any = children;
      if (clone?.type !== "string") {
        clone = clone?.type(children.props);
      }
      return React.cloneElement(clone || <></>, {
        dataDrop: true,
      });
    }
    return children;
  })();

  /** @Effect */
  useEffect(() => {}, []);

  /**
   * @Methods
   */

  /** render */
  return <div className={styles["draggle"]}>{elements}</div>;
};

/**
 * @interface props
 */
export interface DraggleProps {
  children?: ReactElement | ReactElement[];
}

export default Draggle;
