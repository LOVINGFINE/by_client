/*
 * Created by zhangq on 2022/04/03
 * Popover 组件
 */
import React, { ReactElement, FC, useRef, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./style.less";
import { getArrowStyles, setStyles } from "./utils";

const Popover: FC<PopoverProps> = ({
  overlay,
  placement = "bottom",
  children,
  trigger = "click",
}: PopoverProps): ReactElement => {
  const inner = useRef<HTMLDivElement | null>();
  const childrenRef = useRef();
  const childrenElement = (() => {
    if (typeof children?.type !== "string") {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (children as any)?.type((children as any).props);
    }
    return children;
  })();
  const [offset, setOffset] = useState({
    width: 0,
    height: 0,
    left: 0,
    top: 0,
  });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const props: Partial<any> & React.Attributes = (() => {
    if (trigger === "hover") {
      return {
        onMouseEnter: onVisible,
        onMouseLeave: onClose,
      };
    }
    return {
      onClick: onVisible,
    };
  })();

  useEffect(() => {
    if (childrenRef.current) {
      const {
        offsetHeight = 0,
        offsetWidth = 0,
        offsetTop = 0,
        offsetLeft = 0,
      } = childrenRef.current;
      setOffset({
        width: offsetWidth,
        height: offsetHeight,
        left: offsetLeft,
        top: offsetTop,
      });
    }
  }, [childrenRef.current]);

  /**
   * @method
   */

  function onVisible(event: React.MouseEvent) {
    event.preventDefault();
    if (!overlay) return;
    if (!inner.current) {
      const div = document.createElement("div");
      div.className = "popover";
      div.style.opacity = "0";
      const arrowStyles = getArrowStyles(placement, offset);
      const content = (
        <div className="popover-inner" style={arrowStyles.inner}>
          <div className="popover-inner-arrow" style={arrowStyles.bar}>
            <span style={arrowStyles.arrow} />
          </div>
          <div className="popover-inner-content">{overlay}</div>
        </div>
      );
      const root = createRoot(div);
      root.render(content);
      setTimeout(() => {
        setStyles(div, offset, placement);
      });
      inner.current = div;
      document.body.appendChild(div);
    } else {
      document.body.removeChild(inner.current);
      inner.current = null;
    }
  }

  function onClose(event: React.MouseEvent) {
    event.preventDefault();
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

export interface PopoverProps {
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
  overlay?: ReactElement;
  trigger?: "click" | "hover";
}

export default Popover;
