/*
 * Created by zhangq on 2022/04/03
 * Dropdown 组件
 */
import React, { ReactElement, FC, useRef, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "./style.less";
import { getStyles, getOffset } from "../utils/content";

const Dropdown: FC<DropdownProps> = ({
  visible = false,
  overlay,
  placement = "bottom",
  children,
  trigger = "click",
  onVisible,
}: DropdownProps): ReactElement => {
  const childrenRef = useRef<HTMLElement>(null);
  const [visibleValue, setVisibleValue] = useState(visible);
  const offset = getOffset(childrenRef.current);
  const renderStyles = getStyles(offset, placement);

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
          setVisibleValue(true);
        },
        onMouseLeave: (...s: unknown[]) => {
          if (ele.props?.onMouseLeave) {
            ele.props?.onMouseLeave(s);
          }
          setVisibleValue(false);
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
          <div style={renderStyles} className="dropdown">
            <div className="dropdown-overlay">{overlay}</div>
          </div>,
          document.body
        )}
      {render}
    </>
  );
};

export interface DropdownProps {
  placement?:
    | "bottom"
    | "bottomLeft"
    | "bottomRight"
    | "top"
    | "topLeft"
    | "topRight";

  visible?: boolean;
  onVisible?(e: boolean): void;
  children?: ReactElement;
  overlay?: ReactElement;
  trigger?: "click" | "hover";
}

export default Dropdown;
