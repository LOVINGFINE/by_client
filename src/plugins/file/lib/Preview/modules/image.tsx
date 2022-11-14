import { ReactElement, FC, useEffect, useRef } from "react";
import styles from "../style.less";
import { ItemProps } from "../index";

const FileImage: FC<ItemProps> = ({
  info,
  onError,
}: ItemProps): ReactElement => {
  const boxRef = useRef<HTMLDivElement | null>(null);

  const offset = useRef({
    offsetWidth: 0,
    offsetHeight: 0,
  });

  const image = useRef({
    width: 0,
    height: 0,
  });

  const imageStyle = (() => {
    const style: { [k: string]: string | number } = {};
    const { offsetWidth, offsetHeight } = offset.current;
    const { width, height } = image.current;
    if (offsetWidth / offsetHeight < width / height) {
      // 宽度
      if (width > offsetWidth) {
        style["width"] = `${offsetWidth}px`;
      }
    } else {
      // 高度
      if (height > offsetHeight) {
        style["height"] = `${offsetHeight}px`;
      }
    }
    return style;
  })();
  /** @Effect */
  useEffect(() => {
    const img = new Image();
    img.onload = (e: Event) => {
      if (e.target) {
        const { width = 0, height = 0 } = e.target as HTMLImageElement;
        image.current = {
          width,
          height,
        };
      }
    };
    img.onerror = () => {
      if (onError) {
        onError();
      }
    };
    img.src = info?.url || "";
  }, [info.url]);

  /** @Effect */
  useEffect(() => {
    if (boxRef.current) {
      const box = boxRef.current;
      setTimeout(() => {
        const offsetWidth = box?.offsetWidth || 0;
        const offsetHeight = box?.offsetHeight || 0;
        offset.current = {
          offsetWidth,
          offsetHeight,
        };
      });
    }
  }, [boxRef.current]);

  /**
   * @method
   */

  /** render */
  return (
    <div className={styles.image} ref={boxRef}>
      <img
        src={info.url}
        onError={onError}
        style={imageStyle}
        alt={info.filename}
      />
    </div>
  );
};

export default FileImage;
