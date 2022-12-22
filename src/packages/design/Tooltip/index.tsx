/*
 * Created by zhangq on 2022/04/03
 * Tooltip 组件
 */
import React, { ReactElement, FC, useRef, useState } from "react";
import ReactDOM from "react-dom";
import "./style.less";
import {
  getStyles,
  getOffset,
  getArrowStyles,
  getBarStyles,
  getInnerStyles,
} from "../utils/content";

const Tooltip: FC<TooltipProps> = ({
  title = "",
  placement = "bottom",
  children,
  delay = 0,
  zIndex = 1001,
}: TooltipProps): ReactElement => {
  const childrenRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  const offset = getOffset(childrenRef.current);
  const renderStyles = getStyles(offset, placement, 0);

  const innerStyles = (() => {
    return getInnerStyles(placement, 7);
  })();

  const barStyles = (() => {
    return getBarStyles(placement, 7);
  })();

  const arrowStyles = (() => {
    return getArrowStyles(placement, offset.offsetWidth, offset.offsetHeight);
  })();

  /**
   * @method
   */

  function onClose() {
    setTimeout(() => {
      setVisible(false);
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function getProps(ele: any) {
    return {
      onMouseEnter: (...s: unknown[]) => {
        if (ele.props?.onMouseEnter) {
          ele.props?.onMouseEnter(s);
        }
        setTimeout(() => {
          setVisible(true);
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

  const render = (() => {
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

  return (
    <>
      {visible &&
        ReactDOM.createPortal(
          <div className="tooltip" style={{ ...renderStyles, zIndex }}>
            <div className="tooltip-inner" style={innerStyles}>
              <div className="tooltip-inner-arrow" style={barStyles}>
                <span style={arrowStyles} />
              </div>
              <div className="tooltip-inner-content">{title}</div>
            </div>
          </div>,
          document.body
        )}
      {render}
    </>
  );
};

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
  delay?: number;
  children?: ReactElement;
  title?: React.ReactNode;
  zIndex?: number;
}

export default Tooltip;
