/*
 * Created by zhangq on 2022/04/03
 * Popover 组件
 */
import React, { ReactElement, FC, useRef, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./style.less";
import {
  getStyles,
  getOffset,
  getArrowStyles,
  getBarStyles,
  getInnerStyles,
} from "../utils/content";

const Popover: FC<PopoverProps> = ({
  overlay,
  placement = "bottom",
  children,
  trigger = "click",
  visible = false,
  onVisible,
  zIndex = 1001,
}: PopoverProps): ReactElement => {
  const childrenRef = useRef<HTMLElement>(null);
  const [visibleValue, setVisibleValue] = useState(visible);

  const offset = getOffset(childrenRef.current);
  const renderStyles = getStyles(offset, placement, 0);

  const innerStyles = (() => {
    return getInnerStyles(placement);
  })();

  const barStyles = (() => {
    return getBarStyles(placement, 10);
  })();

  const arrowStyles = (() => {
    return getArrowStyles(placement, offset.offsetWidth, offset.offsetHeight);
  })();

  /**
   * @method
   */

  useEffect(() => {
    if (onVisible) {
      onVisible(visibleValue);
    }
  }, [visibleValue]);

  useEffect(() => {
    if (visible !== visibleValue) {
      setVisibleValue(visibleValue);
    }
  }, [visible]);

  useEffect(() => {
    return onClose;
  }, []);

  /**
   * @method
   */

  function onClose() {
    setTimeout(() => {
      setVisibleValue(false);
    });
  }

  function onChangeVisible() {
    if (!visibleValue) {
      setTimeout(() => {
        window.addEventListener("mouseup", onClose, { once: true });
      });
    } else {
      setTimeout(() => {
        window.removeEventListener("mouseup", onClose);
      });
    }
    setVisibleValue(!visibleValue);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function getProps(ele: any) {
    if (trigger === "hover") {
      return {
        onMouseEnter: (...s: unknown[]) => {
          if (ele.props?.onMouseEnter) {
            ele.props?.onMouseEnter(s);
          }
          onChangeVisible();
        },
        onMouseLeave: (...s: unknown[]) => {
          if (ele.props?.onMouseLeave) {
            ele.props?.onMouseLeave(s);
          }
          onChangeVisible();
        },
      };
    }
    return {
      onMouseUp: (...s: unknown[]) => {
        if (ele.props?.onMouseUp) {
          ele.props?.onMouseUp(s);
        }
        onChangeVisible();
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
      {visibleValue &&
        ReactDOM.createPortal(
          <div className="popover" style={{ ...renderStyles, zIndex }}>
            <div className="popover-inner" style={innerStyles}>
              <div className="popover-inner-arrow" style={barStyles}>
                <span style={arrowStyles} />
              </div>
              <div className="popover-inner-content">{overlay}</div>
            </div>
          </div>,
          document.body
        )}
      {render}
    </>
  );
};

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
  visible?: boolean;
  onVisible?(e: boolean): void;
  overlay?: ReactElement;
  trigger?: "click" | "hover";
  zIndex?: number;
}

export default Popover;
