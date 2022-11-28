/*
 * Created by zhangq on 2022/09/15
 * text input
 */
import React, {
  forwardRef,
  useRef,
  KeyboardEvent,
  CSSProperties,
  useImperativeHandle,
  useState,
} from "react";
import styles from "./style.less";
import { SimpleValue } from "@/pages/sheet/editor/type";

const TextInput = forwardRef<TextInputCore | null | undefined, TextInputProps>(
  (props, ref) => {
    const { value, style = {}, onChange, onFocus, onBlur } = props;
    /** @State */
    const [editable, setEditable] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    /**
     * @Methods
     */

    function onTextFocus(e: React.BaseSyntheticEvent) {
      onFocus && onFocus(e);
      setTimeout(() => {
        const rang = window.getSelection();
        rang?.selectAllChildren(e.target);
        rang?.collapseToEnd();
      });
    }

    function onTextBlur(e: React.BaseSyntheticEvent) {
      onBlur && onBlur(e);
      setEditable(false);
      const input = e.target?.textContent || "";
      if (input !== value) {
        onChange && onChange(input);
      }
    }

    function onKeyDown(e: KeyboardEvent | React.KeyboardEvent) {
      const { shiftKey } = e;
      if (e.code === "Enter") {
        if (!shiftKey) {
          inputRef.current?.blur();
        }
      }
    }

    /** @ref */
    useImperativeHandle(
      ref,
      (): TextInputCore => ({
        focus() {
          setEditable(true);
          setTimeout(() => {
            if (inputRef.current) {
              inputRef.current.focus();
            }
          });
        },
        blur() {
          if (inputRef.current) {
            inputRef.current.blur();
          }
        },
      }),
      []
    );

    /** @render */
    return (
      <div
        ref={inputRef}
        suppressContentEditableWarning
        contentEditable={editable}
        style={style}
        className={styles["input"]}
        onBlur={onTextBlur}
        onFocus={onTextFocus}
        onKeyDown={onKeyDown}
      >
        {value}
      </div>
    );
  }
);

/**
 * @interface
 */
export interface TextInputCore {
  focus(): void;
  blur(): void;
}

export interface TextInputProps {
  value: SimpleValue;
  style?: CSSProperties;
  onChange?(e: SimpleValue): void;
  onFocus?(e: React.BaseSyntheticEvent): void;
  onBlur?(e: React.BaseSyntheticEvent): void;
}

export default TextInput;
