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
  const inner = useRef<HTMLDivElement | null>();
  const childrenRef = useRef<HTMLBaseElement>();
  const childrenElement = (() => {
    if (typeof children?.type !== "string") {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (children as any)?.type((children as any).props);
    }
    return children;
  })();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const props: Partial<any> & React.Attributes = (() => {
    return {
      onMouseEnter: onVisible,
      onMouseLeave: onClose,
    };
  })();

  useEffect(() => {
    return onClose;
  }, []);

  /**
   * @method
   */

  function onVisible(event?: React.MouseEvent) {
    event?.preventDefault();
    setTimeout(() => {
      if (!title) return;
      if (!inner.current) {
        const offset = getOffset(childrenRef.current);
        const div = document.createElement("div");
        div.className = "tooltip";
        div.style.opacity = "0";
        const arrowStyles = getTooltipArrowStyles(placement, offset);
        const content = (
          <div className="tooltip-inner" style={arrowStyles.inner}>
            <div className="tooltip-inner-arrow" style={arrowStyles.bar}>
              <span style={arrowStyles.arrow} />
            </div>
            <div className="tooltip-inner-content">{title}</div>
          </div>
        );
        const root = createRoot(div);
        root.render(content);
        setTimeout(() => {
          setStyles(div, offset, placement);
        });
        inner.current = div;
        document.body.appendChild(div);
      }
    }, delay * 1000);
  }

  function onClose(event?: React.MouseEvent) {
    event?.preventDefault();
    if (inner.current) {
      document.body.removeChild(inner.current);
      inner.current = null;
    } else {
    }
  }

  /** render */
  return React.cloneElement(childrenElement || <></>, {
    ref: childrenRef,
    ...props,
  });
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
