/*
 * Created by zhangq on 2022/09/10
 * style
 */
import { FC, MouseEvent, ReactElement } from "react";
import styles from "../style.less";
import { useClassNames } from "@/plugins/style";
const classNames = useClassNames(styles);

const TRow: FC<TRowProps> = ({
  width,
  height,
  children,
  index,
  top,
  selected,
  rowIndexWidth,
  onRowMouseDown,
  onRowMouseEnter,
}) => {
  /** render */
  return (
    <li
      style={{
        position: "absolute",
        display: "flex",
        top,
        height,
        width,
      }}
    >
      <div
        className={classNames({
          rowIndex: true,
          "rowIndex-selection": selected,
        })}
        style={{
          width: rowIndexWidth,
        }}
        onMouseDown={onRowMouseDown}
        onMouseEnter={onRowMouseEnter}
      >
        {index + 1}
      </div>
      {children}
    </li>
  );
};

/**
 * @interface props
 */
export interface TRowProps {
  width: number;
  height: number;
  top: number;
  children?: ReactElement | ReactElement[];
  index: number;
  selected: boolean;
  rowIndexWidth: number;
  columnEndIndex: number;
  onRowMouseDown(e: MouseEvent): void;
  onRowMouseEnter(e: MouseEvent): void;
}

export default TRow;
