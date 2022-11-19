import { FC, ReactElement } from "react";
import styles from "../style.less";

const Cell: FC<CellProps> = ({
  width,
  left,
  height,
  children,
  selected,
  onMouseDown,
  onMouseEnter,
  onContextMenu,
}) => {
  const style = {
    left,
    top: 0,
    width,
    height,
  };
  /** render */
  return (
    <div
      className={styles["cell"]}
      style={style}
      onContextMenu={onContextMenu}
      onMouseDown={onMouseDown}
      onMouseEnter={onMouseEnter}
    >
      <div
        className={`${styles["cell-value"]} ${
          selected ? styles["cell-value-selected"] : ""
        }`}
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
  left: number;
  selected: boolean;
  children: ReactElement;
  onMouseDown(e: React.MouseEvent): void;
  onMouseEnter(e: React.MouseEvent): void;
  onContextMenu?(e: React.MouseEvent): void;
}

export default Cell;
