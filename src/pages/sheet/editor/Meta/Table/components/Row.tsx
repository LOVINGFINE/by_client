/*
 * Created by zhangq on 2022/09/10
 * style
 */
import { FC, MouseEvent, ReactElement } from "react";
import styles from "../style.less";
import { useClassNames } from "@/plugins/style";
import { dropSizeEvent } from "@/plugins/event";
import { DropEndProp } from "@/plugins/event/type";

const classNames = useClassNames(styles);

const TRow: FC<TRowProps> = ({
  width,
  height,
  children,
  index,
  top,
  selected,
  rowIndexWidth,
  canSelection,
  onRowSize,
  onRowMouseDown,
  onRowMouseEnter,
}) => {
  /**
   * @Methods
   */
  function onResize(e: MouseEvent) {
    e.stopPropagation();
    const end = (d: DropEndProp) => {
      onRowSize && onRowSize(index, d.height);
    };
    const opts = {
      height,
      offsetWidth: width,
    };
    dropSizeEvent(e, opts, end);
  }

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
        {/* {!canSelection && onRowSize && (
          <div
            onMouseDown={onResize}
            className={classNames({
              drop: true,
              "drop-ns": true,
            })}
          />
        )} */}
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
  canSelection: boolean;
  onRowSize?(i: number, h: number): void;
  onRowMouseDown(e: MouseEvent): void;
  onRowMouseEnter(e: MouseEvent): void;
}

export default TRow;
