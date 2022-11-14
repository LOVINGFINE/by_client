/* eslint-disable @typescript-eslint/no-explicit-any */
/*
 * Created by zhangq on 2021/11/26
 * message 组件
 */
import { createRoot } from "react-dom/client";
import { ReactElement } from "react";
import Icon from "../Icon";
import "./style.less";

export interface MessageOption {
  zIndex?: number;
  duration?: number;
}

export interface MessageRenderOption {
  title: string;
  icon: ReactElement;
  duration: number;
  background: string;
  color?: string;
}
export const classKey = "message";

export function resetElements() {
  const body = document.body;
  (Array.from(body?.childNodes) as HTMLDivElement[])
    .filter((ele) => {
      const className = ele?.className || "";
      return (
        ele?.nodeName === "DIV" &&
        !!className &&
        className.indexOf(classKey) !== -1
      );
    })
    .forEach((ele, i) => {
      ele.style.top = `${i * 55 + 15}px`;
    });
}

class Message {
  static success(title: string, options?: MessageOption) {
    const opts: MessageRenderOption = {
      title,
      icon: (
        <Icon
          name={"check-circle"}
          style={{ color: "#73d13d", fontSize: 16 }}
        />
      ),
      duration: options?.duration || 2500,
      background: "var(--d-bgc)",
    };
    Message.render(opts);
  }

  static warning(title: string, options?: MessageOption) {
    const opts: MessageRenderOption = {
      title,
      icon: (
        <Icon name={"exclamation"} style={{ color: "#f6e260", fontSize: 16 }} />
      ),
      duration: options?.duration || 2500,
      background: "var(--d-bgc)",
    };
    Message.render(opts);
  }

  static error(title: string, options?: MessageOption) {
    const opts: MessageRenderOption = {
      title,
      icon: (
        <Icon
          name={"times-circle"}
          style={{ color: "var(--d-text-error)", fontSize: 16 }}
        />
      ),
      duration: options?.duration || 2500,
      background: "var(--d-bgc)",
    };
    Message.render(opts);
  }

  static render({
    title,
    icon,
    duration,
    background,
    color,
  }: MessageRenderOption) {
    const div = document.createElement("div");
    div.className = classKey;
    const content = (
      <div
        className={`message-render`}
        style={{
          background,
          color,
        }}
      >
        {icon}
        <span>{title}</span>
      </div>
    );
    const root = createRoot(div);
    root.render(content);
    document.body.appendChild(div);
    resetElements();
    setTimeout(() => {
      div.style.opacity = "0";
      setTimeout(() => {
        document.body.removeChild(div);
        resetElements();
      }, 250);
    }, duration);
  }
}

export default Message;
