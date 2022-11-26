/*
 * Created by zhangq on 2022/04/03
 * Popover 组件
 */
import React, {
  ReactElement,
  FC,
  useRef,
  useEffect,
  useState,
  CSSProperties,
  Fragment,
} from "react";
import "./style.less";
import { getArrowStyles, getOffset, getStyles } from "../Tooltip/utils";
import ReactDOM from "react-dom";
import { useVisible } from "@/plugins/event";

const Popover: FC<PopoverProps> = ({
  overlay,
  placement = "bottom",
  children,
  trigger = "click",
  visible,
  onVisible,
}: PopoverProps): ReactElement => {
  const [renderStyles, setRenderStyles] = useState<{
    content: CSSProperties;
    inner: CSSProperties;
    bar: CSSProperties;
    arrow: CSSProperties;
  }>({
    content: {},
    inner: {},
    bar: {},
    arrow: {},
  });
  const visibleValue = useVisible({
    value: visible,
    cb: onVisible,
  });
  const renderRef = useRef<HTMLDivElement>(null);
  const childrenRef = useRef<HTMLBaseElement>();

  useEffect(() => {
    return onClose;
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (renderRef.current) {
        const offset = getOffset(childrenRef.current);
        const contentStyle = getStyles(renderRef.current, offset, placement);
        const styles = getArrowStyles(placement, offset);
        setRenderStyles({
          ...styles,
          content: contentStyle,
        });
      }
    });
  }, [overlay, childrenRef.current, renderRef.current]);

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
  return (
    <Fragment>
      {ReactDOM.createPortal(
        visibleValue.value && (
          <div className="tooltip" style={renderStyles.content} ref={renderRef}>
            <div className="tooltip-inner" style={renderStyles.inner}>
              <div className="tooltip-inner-arrow" style={renderStyles.bar}>
                <span style={renderStyles.arrow} />
              </div>
              <div className="tooltip-inner-content">{overlay}</div>
            </div>
          </div>
        ),
        document.body,
        `dropdown-${new Date().getTime()}`
      )}
      {element}
    </Fragment>
  );
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
