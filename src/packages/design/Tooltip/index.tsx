/*
 * Created by zhangq on 2022/03/11
 * Tooltip
 */
import React, { ReactElement, FC, useRef, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./style.less";
import { getOffset, getTooltipArrowStyles, setStyles } from "./utils";

const Tooltip: FC<TooltipProps> = ({
  title = "",
  placement = "top",
  children,
  delay = 0,
}: TooltipProps): ReactElement => {
  const childrenRef = useRef<HTMLBaseElement>(null);
  const renderId = useRef<string | null>(null);

  useEffect(() => {
    return onClose;
  }, []);

  /**
   * @method
   */
  function onOpen() {
    if (!renderId.current && title) {
      const id = `tooltip-${new Date().getTime()}`;
      const div = document.createElement("div");
      div.id = id;
      div.className = "tooltip";
      div.onmousedown = (e) => {
        e.stopPropagation();
        setTimeout(() => {
          onClose();
        }, 200);
      };
      const offset = getOffset(childrenRef.current);
      const styles = getTooltipArrowStyles(placement, offset);
      const root = createRoot(div);
      root.render(
        <div className="tooltip-inner" style={styles.inner}>
          <div className="tooltip-inner-arrow" style={styles.bar}>
            <span style={styles.arrow} />
          </div>
          <div className="tooltip-inner-content">{title}</div>
        </div>
      );
      setTimeout(() => {
        setStyles(offset, placement, div);
      });
      document.body.appendChild(div);
      renderId.current = id;
    }
  }

  function onClose() {
    if (renderId.current) {
      const is = document.getElementById(renderId.current);
      if (is) {
        document.body.removeChild(is);
        renderId.current = null;
      }
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function getProps(ele: any) {
    return {
      onMouseEnter: (...s: unknown[]) => {
        if (ele.props?.onMouseEnter) {
          ele.props?.onMouseEnter(s);
        }
        setTimeout(() => {
          onOpen();
        }, delay * 1000);
      },
      onMouseLeave: (...s: unknown[]) => {
        if (ele.props?.onMouseLeave) {
          ele.props?.onMouseLeave(s);
        }
        setTimeout(() => {
          onClose();
        });
      },
    };
  }

  const element = (() => {
    if (!children) return <></>;
    if (typeof children?.type !== "string") {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const ele = children as any;
      return React.cloneElement(ele?.type(ele?.props), {
        ref: childrenRef,
        ...getProps(ele),
      });
    }
    return React.cloneElement(children, {
      ref: childrenRef,
      ...getProps(children),
    });
  })();

  /** render */
  return element;
};

/**
 * @interface props
 */
export interface OffsetProp {
  width: number;
  height: number;
  left: number;
  top: number;
}

export interface TooltipProps {
  placement?:
    | "bottom"
    | "bottomLeft"
    | "bottomRight"
    | "top"
    | "topLeft"
    | "topRight"
    | "left"
    | "leftTop"
    | "leftBottom"
    | "right"
    | "rightTop"
    | "rightBottom";

  children?: ReactElement;
  title?: ReactElement | string;
  delay?: number;
}

export default Tooltip;
