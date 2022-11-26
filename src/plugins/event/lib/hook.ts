import { useEffect, useState } from "react";

export function useVisible(props: {
  value?: boolean;
  cb?: (e: boolean) => void;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (props.value !== undefined) {
      setVisible(props.value);
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
        setVisible(v);
      }
    },
  };
}
