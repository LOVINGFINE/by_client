/*
 * Created by zhangq on 2022/03/11
 * Tooltip
 */
import React, {
  ReactElement,
  FC,
  useRef,
  useEffect,
  CSSProperties,
  useState,
  Fragment,
} from "react";
import ReactDOM from "react-dom";
import "./style.less";
import { getOffset, getTooltipArrowStyles, getStyles } from "./utils";

const Tooltip: FC<TooltipProps> = ({
  title = "",
  placement = "top",
  children,
  delay = 0,
}: TooltipProps): ReactElement => {
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
  const [open, setOpen] = useState(false);
  const childrenRef = useRef<HTMLBaseElement>(null);
  const renderRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    return () => setOpen(false);
  }, []);

  useEffect(() => {
    if (renderRef.current) {
      const offset = getOffset(childrenRef.current);
      const contentStyle = getStyles(renderRef.current, offset, placement);
      const styles = getTooltipArrowStyles(placement, offset);
      setRenderStyles({
        ...styles,
        content: contentStyle,
      });
    }
  }, [title, childrenRef.current, renderRef.current]);

  /**
   * @method
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function getProps(ele: any) {
    return {
      onMouseEnter: (...s: unknown[]) => {
        if (ele.props?.onMouseEnter) {
          ele.props?.onMouseEnter(s);
        }
        setTimeout(() => {
          setOpen(true);
        }, delay * 1000);
      },
      onMouseLeave: (...s: unknown[]) => {
        if (ele.props?.onMouseLeave) {
          ele.props?.onMouseLeave(s);
        }
        setTimeout(() => {
          setOpen(false);
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
  return (
    <Fragment>
      {open &&
        ReactDOM.createPortal(
          <div className="tooltip" style={renderStyles.content} ref={renderRef}>
            <div className="tooltip-inner" style={renderStyles.inner}>
              <div className="tooltip-inner-arrow" style={renderStyles.bar}>
                <span style={renderStyles.arrow} />
              </div>
              <div className="tooltip-inner-content">{title}</div>
            </div>
          </div>,
          document.body
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
