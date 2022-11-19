/*
 * Created by zhangq on 2022/04/03
 * Dropdown 组件
 */
import React, {
  ReactElement,
  FC,
  useRef,
  useEffect,
  useState,
  Fragment,
} from "react";
import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
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
  const [open, setOpen] = useState<boolean>(false);
  const [size, setSize] = useState({
    overlayWidth: 0,
    overlayHeight: 0,
  });

  useEffect(() => {
    return onClose;
  }, []);

  useEffect(() => {
    if (visible !== undefined) {
      setOpen(visible);
    }
  }, [visible]);

  useEffect(() => {
    if (overlay) {
      const div = document.createElement("div");
      div.className = "dropdown";
      div.style.opacity = "0";
      const root = createRoot(div);
      const content = <div className="dropdown-overlay">{overlay}</div>;
      root.render(content);
      setTimeout(() => {
        const overlayWidth = div?.offsetWidth;
        const overlayHeight = div?.offsetHeight;
        setSize({
          overlayWidth,
          overlayHeight,
        });
        document.body.removeChild(div);
      });
      document.body.appendChild(div);
    }
  }, [overlay]);
  /**
   * @method
   */
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
      onClick: (...s: unknown[]) => {
        if (ele.props?.onClick) {
          ele.props?.onClick(s);
        }
        onChangeVisible();
      },
    };
  }

  function onClose() {
    setOpen(false);
  }

  function onChangeVisible() {
    if (visible !== undefined) {
      onVisible && onVisible(!visible);
    } else {
      if (!open) {
        setTimeout(() => {
          window.addEventListener("mousedown", onClose, { once: true });
          window.addEventListener("click", onClose, { once: true });
        });
      }
      setOpen(!open);
    }
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

  const render = () => {
    const styles = getStyles(childrenRef.current, size, placement);
    return (
      <div className="dropdown" style={styles}>
        <div className="dropdown-overlay">{overlay}</div>
      </div>
    );
  };
  return (
    <Fragment>
      {ReactDOM.createPortal(open && render(), document.body)}
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
