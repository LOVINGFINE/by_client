/*
 * Created by zhangq on 2021/11/26
 * 抽屉组件
 */
import React, {
  ReactElement,
  FC,
  ReactNode,
  CSSProperties,
  Fragment,
} from "react";
import "./style.less";
import Icon from "../Icon";
import ReactDOM from "react-dom";

const Drawer: FC<DrawerProps> = (props: DrawerProps): ReactElement => {
  const {
    placement = "left",
    children,
    visible = false,
    width = 375,
    zIndex = 1001,
    close = true,
    style = {},
    maskClose = true,
    mask = true,
    onClose = () => {},
  } = props;

  const bodyStyle = getStyle(placement, style, width);

  function onMaskClick() {
    if (maskClose && onClose) {
      onClose();
    }
  }

  const render = (
    <Fragment>
      <div className={"drawer"} style={{ zIndex }}>
        {mask && <div className={`drawer-mask`} onClick={onMaskClick} />}
        <div className={`drawer-body`} style={bodyStyle}>
          {close && (
            <div className={`drawer-close`} onClick={onClose}>
              <Icon name="close" />
            </div>
          )}
          {children}
        </div>
      </div>
    </Fragment>
  );
  /** @render */
  return ReactDOM.createPortal(visible && render, document.body);
};

function getStyle(
  placement: "left" | "top" | "right" | "bottom",
  style: CSSProperties,
  width: number
) {
  if (placement === "right") {
    return { ...style, height: "100vh", width, top: 0, right: 0 };
  }
  if (placement === "bottom") {
    return { ...style, width: "100vw", height: width, bottom: 0, left: 0 };
  }
  if (placement === "top") {
    return { ...style, width: "100vw", top: 0, height: width, left: 0 };
  }
  return { ...style, height: "100vh", width, top: 0, left: 0 };
}

export interface DrawerProps {
  children?: React.ReactElement | React.ReactElement[] | string;
  placement?: "left" | "top" | "right" | "bottom";
  style?: React.CSSProperties;
  visible?: boolean;
  zIndex?: number;
  width?: number;
  close?: boolean | ReactNode;
  onClose?(): void;
  maskClose?: boolean;
  mask?: boolean;
}
export default Drawer;
