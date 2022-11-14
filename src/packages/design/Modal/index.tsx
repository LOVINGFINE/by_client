/*
 * Created by zhangq on 2021/11/26
 * modal 组件
 */
import React, {
  ReactElement,
  FC,
  useEffect,
  useRef,
  CSSProperties,
  Fragment,
} from "react";
import { createRoot } from "react-dom/client";
import "./style.less";
import Button from "../Button";
import ReactDOM from "react-dom";

const Modal: FC<ModalProps> = (props: ModalProps): ReactElement => {
  const {
    width = 450,
    closeDestroy = false,
    children,
    visible = false,
    style = {},
    title = "",
    footer,
    onOk,
    onCancel,
  } = props;
  const okProps = (() => {
    const {
      loading = false,
      text = "确定",
      disabled = false,
    } = props.okProps || {};
    return {
      loading,
      text,
      disabled,
    };
  })();
  const cancelProps = (() => {
    const {
      loading = false,
      text = "取消",
      disabled = false,
    } = props.cancelProps || {};
    return {
      loading,
      text,
      disabled,
    };
  })();
  const footerRender = (() => {
    if (footer) {
      return footer;
    }
    return (
      <Fragment>
        <Button
          onClick={onCancel}
          disabled={cancelProps.disabled}
          loading={cancelProps.loading}
        >
          {cancelProps.text}
        </Button>
        <Button
          type={"primary"}
          disabled={okProps.disabled}
          loading={okProps.loading}
          onClick={onOk}
        >
          {okProps.text}
        </Button>
      </Fragment>
    );
  })();
  const render = (
    <Fragment>
      <div className="modal-mask" onClick={onCancel} />
      <div
        className={"modal"}
        style={{
          width,
          ...style,
        }}
      >
        {!cancelProps.disabled && (
          <span className="modal-close" onClick={onCancel}>
            x
          </span>
        )}
        <div className={`modal-top`}>{title}</div>
        <div className={`modal-body`}>{children}</div>
        <div className={`modal-footer`}>{footerRender}</div>
      </div>
    </Fragment>
  );

  /** render */
  return ReactDOM.createPortal(visible && render, document.body);
};

export interface ModalProps {
  visible?: boolean;
  title?: string | ReactElement;
  footer?: null | ReactElement[] | ReactElement;
  closeDestroy?: boolean;
  style?: CSSProperties;
  width?: number;
  okProps?: {
    loading?: boolean;
    text?: string | ReactElement;
    disabled?: boolean;
  };
  cancelProps?: {
    loading?: boolean;
    text?: string | ReactElement;
    disabled?: boolean;
  };
  children?: React.ReactElement | React.ReactElement[] | string;
  onCancel?(): void;
  onOk?(): void;
}
export default Modal;
