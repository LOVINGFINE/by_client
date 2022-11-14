/*
 * Created by zhangq on 2022/02/01
 * input 输入框
 */
import React, {
  useRef,
  forwardRef,
  CSSProperties,
  KeyboardEvent,
  FormEvent,
  useImperativeHandle,
} from "react";
import "./style.less";
const Input = forwardRef<InputRef | null, InputProps>((props, ref) => {
  const {
    value = "",
    size = "middle",
    change,
    onBlur,
    placeholder = "请输入",
    width = "100%",
    style = {},
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
      type={"text"}
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
});

export interface InputRef {
  focus(): void;
  select(): void;
}
/**
 * @interface props
 */
export interface InputProps {
  value?: string | number;
  change?(e: string): void;
  onEnter?(e: KeyboardEvent): void;
  onBlur?(): void;
  size?: "middle" | "small" | "large";
  placeholder?: string;
  width?: number | string;
  style?: CSSProperties;
}

export default Input;
