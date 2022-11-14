/*
 * Created by zhangq on 2022/08/31
 *
 */
import { CSSProperties, FC, ReactElement } from "react";
import { useClassNames } from "@/plugins/style";
import styles from "../style.less";

const classNames = useClassNames(styles);

const Cell: FC<CellProps> = (props) => {
  const {
    width,
    style = {},
    x,
    y,
    height,
    children,
    selected,
    onMouseDown,
    onMouseEnter,
    onContextMenu,
  } = props;

  /** render */
  return (
    <div
      className={classNames({
        cell: true,
        "cell-selected": selected,
      })}
      style={{
        left: x,
        top: y,
        width,
        height,
        ...style,
      }}
      onContextMenu={onContextMenu}
      onMouseDown={onMouseDown}
      onMouseEnter={onMouseEnter}
    >
      <div
        className={classNames({
          "cell-value": true,
        })}
      >
        {selected && (
          <>
            <div className={styles["cell-value-top"]} />
            <div className={styles["cell-value-bottom"]} />
            <div className={styles["cell-value-left"]} />
            <div className={styles["cell-value-right"]} />
          </>
        )}

        {children}
      </div>
    </div>
  );
};

export interface CellProps {
  width: number | string;
  height: number | string;
  x: number;
  y: number;
  selected: boolean;
  children?: ReactElement;
  style?: CSSProperties;
  onMouseDown(e: React.MouseEvent): void;
  onMouseEnter(e: React.MouseEvent): void;
  onContextMenu?(e: React.MouseEvent): void;
}

export default Cell;
