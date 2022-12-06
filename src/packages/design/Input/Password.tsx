/*
 * Created by zhangq on 2022/02/01
 * input 密码框 输入框
 */
import {
  useRef,
  forwardRef,
  KeyboardEvent,
  FormEvent,
  useImperativeHandle,
} from "react";
import "./style.less";
import { InputRef, InputProps } from "./Input";
import { useVisible } from "@/plugins/event";
import Icon from "../Icon";

/**
 * @interface props
 */
export interface InputPasswordProps extends InputProps {
  hide?: boolean;
  onHide?(e: boolean): void;
}

const InputPassword = forwardRef<InputRef | null, InputPasswordProps>(
  (props, ref) => {
    const {
      value = "",
      size = "middle",
      placeholder = "请输入",
      width = "100%",
      style = {},
      hide = true,
      onHide,
      change,
      onBlur,
      onEnter,
    } = props;
    const hideValue = useVisible({
      value: hide,
      cb: onHide,
    });

    const inputRef = useRef<HTMLInputElement>(null);

    function onKeyDown(e: KeyboardEvent) {
      const key = e.key;
      if (key === "Enter" && onEnter) {
        onEnter(e);
      }
    }

    function onInput(e: FormEvent<HTMLInputElement>) {
      const input = e.currentTarget.value || "";
      if (change) {
        change(input);
      }
    }

    /** @ref */
    useImperativeHandle(
      ref,
      (): InputRef => ({
        focus: () => inputRef.current?.focus(),
        select: () => inputRef.current?.select(),
      }),
      []
    );
    console.log(hideValue.value);

    /** render */
    return (
      <div
        className="input-wrapper"
        style={{
          width,
        }}
      >
        <input
          ref={inputRef}
          type={hideValue.value ? "password" : "text"}
          className={`input input-${size}`}
          placeholder={placeholder}
          style={{
            ...style,
          }}
          value={value}
          onBlur={onBlur}
          onKeyDown={onKeyDown}
          onInput={onInput}
        />
        <span
          className={`input-wrapper-suffix input-wrapper-suffix-${size}`}
          onClick={() => hideValue.setVisible(!hideValue.value)}
        >
          <Icon name={hideValue.value ? "eye-slash" : "eye"} />
        </span>
      </div>
    );
  }
);

export default InputPassword;
