/*
 * Created by zhangq on 2022/04/03
 * Dropdown 组件
 */
import { useVisible } from "@/plugins/event";
import React, { ReactElement, FC, useRef, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./style.less";
import { setStyles } from "./utils";

const Dropdown: FC<DropdownProps> = ({
  visible,
  overlay,
  placement = "bottom",
  children,
  trigger = "click",
  onVisible,
}: DropdownProps): ReactElement => {
  const childrenRef = useRef<HTMLElement>(null);
  const renderId = useRef<string | null>(null);

  const visibleValue = useVisible({
    value: visible,
    cb: onVisible,
  });

  useEffect(() => {
    return onClose;
  }, []);

  useEffect(() => {
    if (overlay) {
      if (visibleValue.value && !renderId.current) {
        const id = `dropdown-${new Date().getTime()}`;
        const div = document.createElement("div");
        div.id = id;
        div.className = "dropdown";
        div.onmouseup = (e) => {
          e.stopPropagation();
          setTimeout(() => {
            onClose();
          });
        };
        const root = createRoot(div);
        root.render(<div className="dropdown-overlay">{overlay}</div>);
        setTimeout(() => {
          setStyles(childrenRef.current, placement, div);
        });
        document.body.appendChild(div);
        renderId.current = id;
      }
    }
  }, [overlay, childrenRef.current, visibleValue.value]);
  /**
   * @method
   */

  function onClose() {
    visibleValue.setVisible(false);
    if (renderId.current) {
      const is = document.getElementById(renderId.current);
      if (is) {
        document.body.removeChild(is);
        renderId.current = null;
      }
    }
  }

  function onChangeVisible() {
    if (!visibleValue.value) {
      setTimeout(() => {
        window.addEventListener("mouseup", onClose, { once: true });
      });
    } else {
      setTimeout(() => {
        window.removeEventListener("mouseup", onClose);
      });
    }
    visibleValue.setVisible(!visibleValue.value);
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
        if (ele.props?.onClick) {
          ele.props?.onMouseDown(s);
        }
        onChangeVisible();
      },
    };
  }

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
