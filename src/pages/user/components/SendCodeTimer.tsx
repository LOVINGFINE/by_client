/*
 * Created by zhangq on 2022/11/05
 * SendCodeTimer
 */
import { FC, useEffect, useState } from "react";
import { Button } from "@/packages/design";

const SendCodeTimer: FC<SendCodeTimerProps> = ({
  visible,
  duration = 60,
  onVisible,
  onSend,
}) => {
  const [label, setLabel] = useState("发送验证码");

  useEffect(() => {
    if (visible) {
      let time = duration;
      const timer = setInterval(() => {
        if (time > 0) {
          setLabel(`${time}秒后重新发送`);
          time -= 1;
        } else {
          clearInterval(timer);
          onVisible(false);
          setLabel(`发送验证码`);
        }
      }, 1000);
    }
  }, [visible]);

  /** @render */
  return (
    <Button
      disabled={visible}
      type={visible ? "default" : "primary"}
      size={"large"}
      onClick={onSend}
    >
      {label}
    </Button>
  );
};

/**
 * @interface props
 */
export interface SendCodeTimerProps {
  visible: boolean;
  duration?: number;
  onVisible(e: boolean): void;
  onSend(): void;
}

export default SendCodeTimer;
