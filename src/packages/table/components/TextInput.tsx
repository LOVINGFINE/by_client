/*
 * Created by zhangq on 2022/09/15
 * text input
 */
import {
  forwardRef,
  useEffect,
  useState,
  useRef,
  KeyboardEvent,
  CSSProperties,
  FocusEvent,
  useImperativeHandle,
} from "react";
import styles from "../style.less";
import { SimpleData } from "../type";
const TextInput = forwardRef<TextInputCore | null | undefined, TextInputProps>(
  (props, ref) => {
    const { value, style = {}, onChange, onFocus, onBlur } = props;
    /** @State */
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const [editing, setEditing] = useState(false);
    const [input, setInput] = useState<SimpleData>("");
    /** @Effect */
    useEffect(() => {
      if (!editing) {
        setInput(value);
      }
    }, [value]);

    /**
     * @Methods
     */
    function onValue() {
      if (value !== input) {
        // 修改
        onChange(input);
      }
    }

    function onTextFocus(e: FocusEvent<HTMLTextAreaElement>) {
      onFocus && onFocus(e);
      if (inputRef.current) {
        inputRef.current.select();
      }
      setEditing(true);
    }

    function onTextBlur(e: FocusEvent<HTMLTextAreaElement>) {
      onBlur && onBlur(e);
      setEditing(false);
      onValue();
    }

    function onKeyDown(e: KeyboardEvent) {
      if (e.code === "Enter") {
        if (!e.shiftKey) {
          onValue();
        }
      }
    }

    function onTextInput(e: React.FormEvent<HTMLTextAreaElement>) {
      setInput(e.currentTarget.value);
    }

    /** @ref */
    useImperativeHandle(
      ref,
      (): TextInputCore => ({
        focus() {
          if (inputRef.current) {
            inputRef.current.focus();
          }
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
      <textarea
        ref={inputRef}
        style={style}
        className={styles["input"]}
        value={`${input}`}
        onInput={onTextInput}
        onBlur={onTextBlur}
        onFocus={onTextFocus}
        onKeyDown={onKeyDown}
      />
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
  value: SimpleData;
  style?: CSSProperties;
  onChange(e: SimpleData): void;
  onFocus?(e: FocusEvent<HTMLTextAreaElement>): void;
  onBlur?(e: FocusEvent<HTMLTextAreaElement>): void;
}

export default TextInput;
