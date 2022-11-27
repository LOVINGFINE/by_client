/*
 * Created by zhangq on 2022/04/03
 * Popover 组件
 */
import React, { ReactElement, FC, useRef, useEffect } from "react";
import "./style.less";
import { getArrowStyles, getOffset, setStyles } from "../Tooltip/utils";
import { useVisible } from "@/plugins/event";
import { createRoot } from "react-dom/client";

const Popover: FC<PopoverProps> = ({
  overlay,
  placement = "bottom",
  children,
  trigger = "click",
  visible,
  onVisible,
}: PopoverProps): ReactElement => {
  const visibleValue = useVisible({
    value: visible,
    cb: onVisible,
  });
  const childrenRef = useRef<HTMLBaseElement>();
  const renderId = useRef<string | null>(null);
  useEffect(() => {
    return onClose;
  }, []);

  useEffect(() => {
    if (!renderId.current && overlay && visibleValue.value) {
      const id = `popover-${new Date().getTime()}`;
      const div = document.createElement("div");
      div.id = id;
      div.className = "popover";
      div.onmousedown = (e) => {
        e.stopPropagation();
        setTimeout(() => {
          onClose();
        }, 200);
      };
      const offset = getOffset(childrenRef.current);
      const styles = getArrowStyles(placement, offset);
      const root = createRoot(div);
      root.render(
        <div className="popover-inner" style={styles.inner}>
          <div className="popover-inner-arrow" style={styles.bar}>
            <span style={styles.arrow} />
          </div>
          <div className="popover-inner-content">{overlay}</div>
        </div>
      );
      setTimeout(() => {
        setStyles(offset, placement, div);
      });
      document.body.appendChild(div);
      renderId.current = id;
    }
  }, [overlay, childrenRef.current, visibleValue.value]);

  /**
   * @method
   */

  function onChangeVisible(event?: React.MouseEvent) {
    event?.preventDefault();
    visibleValue.setVisible(true);
  }

  function onClose(event?: React.MouseEvent) {
    event?.preventDefault();
    visibleValue.setVisible(false);
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
      onMouseDown: (...s: unknown[]) => {
        if (ele.props?.onClick) {
          ele.props?.onMouseDown(s);
        }
        onChangeVisible();
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
}

export default Popover;
