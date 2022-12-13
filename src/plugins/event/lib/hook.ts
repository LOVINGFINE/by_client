import { useEffect } from "react";

export function useVisible(props: {
  value?: boolean;
  cb?: (e: boolean) => void;
}) {
  let visible = false;

  useEffect(() => {
    if (props.value !== undefined) {
      visible = props.value;
    }
  }, [props.value]);

  return {
    value: visible,
    setVisible(v: boolean) {
      if (props.value !== undefined) {
        if (props.cb) {
          props?.cb(v);
        }
      } else {
        visible = v;
      }
    },
  };
}
