/*
 * Created by zhangq on 2022/02/01
 * input number 输入框
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

/**
 * @interface props
 */
export interface InputNumberProps extends InputProps {
  min?: number;
  max?: number;
}

const InputPassword = forwardRef<InputRef | null, InputNumberProps>(
  (props, ref) => {
    const {
      value = "",
      size = "middle",
      placeholder = "请输入",
      width = "100%",
      style = {},
      change,
      onBlur,
      onEnter,
    } = props;
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
    /** render */
    return (
      <input
        ref={inputRef}
        type="number"
        className={`input input-${size}`}
        placeholder={placeholder}
        style={{
          width,
          ...style,
        }}
        value={value}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
        onInput={onInput}
      />
    );
  }
);

export default InputPassword;
