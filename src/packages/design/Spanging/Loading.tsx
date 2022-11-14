/*
 * Created by zhangq on 2022/10/31
 * style
 */
import { FC, useEffect } from "react";
import "./style.less";

const Loading: FC<LoadingProps> = ({
  size = "middle",
  type = "loop",
  content = "Loading",
}) => {
  /** @State */

  /** @Effect */
  useEffect(() => {}, []);

  /**
   * @Methods
   */

  /** render */
  switch (type) {
    case "stripes":
      return <div className={`stripes stripes-${size}`}></div>;
    case "alternate":
      return (
        <div className={`alternate alternate-${size}`}>
          <div className={`alternate-content`}>
            {[1, 2, 3, 4, 5].map((num) => {
              return <div className="alternate-dot" key={num} />;
            })}
          </div>
        </div>
      );
    case "image":
      return <div className={`image image-${size}`} />;
    case "text":
      return (
        <div className={`text text-${size}`}>
          {content}
          <span> {content}</span>
        </div>
      );
    default:
      return <div className={`loop  loop-${size}`} />;
  }
};

/**
 * @interface props
 */
export type LoadingType = "loop" | "stripes" | "image" | "alternate" | "text";

export interface LoadingProps {
  type?: LoadingType;
  size?: "middle" | "small" | "large";
  content?: string | number;
}

export default Loading;
