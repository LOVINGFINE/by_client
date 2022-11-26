/*
 * Created by zhangq on 2022/04/03
 * Dropdown 组件
 */
import { useVisible } from "@/plugins/event";
import React, {
  ReactElement,
  FC,
  useRef,
  useEffect,
  useState,
  Fragment,
  CSSProperties,
} from "react";
import ReactDOM from "react-dom";
import "./style.less";
import { getStyles } from "./utils";

const Dropdown: FC<DropdownProps> = ({
  visible,
  overlay,
  placement = "bottom",
  children,
  trigger = "click",
  onVisible,
}: DropdownProps): ReactElement => {
  const childrenRef = useRef<HTMLElement>(null);
  const renderRef = useRef<HTMLDivElement>(null);

  const visibleValue = useVisible({
    value: visible,
    cb: onVisible,
  });
  const [renderStyles, setRenderStyles] = useState<CSSProperties>({});

  useEffect(() => {
    return onClose;
  }, []);

  useEffect(() => {
    if (overlay) {
      if (renderRef.current) {
        const overlayWidth = renderRef.current?.offsetWidth;
        const overlayHeight = renderRef.current?.offsetHeight;
        const styles = getStyles(
          childrenRef.current,
          {
            overlayWidth,
            overlayHeight,
          },
          placement
        );
        setRenderStyles(styles);
      } else {
        setRenderStyles({});
      }
    }
  }, [overlay, childrenRef.current, renderRef.current]);
  /**
   * @method
   */

  function onClose() {
    visibleValue.setVisible(false);
  }

  function onChangeVisible() {
    if (!visibleValue.value) {
      setTimeout(() => {
        window.addEventListener("mousedown", onClose, { once: true });
      });
    } else {
      setTimeout(() => {
        window.removeEventListener("mousedown", onClose);
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

  return (
    <Fragment>
      {ReactDOM.createPortal(
        visibleValue.value && (
          <div
            ref={renderRef}
            className="dropdown"
            onMouseDown={(e) => {
              e.stopPropagation();
              setTimeout(() => {
                onClose();
              }, 200);
            }}
            style={renderStyles}
          >
            <div className="dropdown-overlay">{overlay}</div>
          </div>
        ),
        document.body
      )}
      {element}
    </Fragment>
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
