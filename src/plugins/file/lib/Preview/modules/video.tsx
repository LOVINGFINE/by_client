import { ReactElement, FC, useEffect } from "react";
import { ItemProps } from "../index";
import styles from "../style.less";

const FileVideo: FC<ItemProps> = ({ info }: ItemProps): ReactElement => {
  /** state */

  /** LifeCycle */
  useEffect(() => {}, []);

  /**
   * @method
   */
  function onError() {}

  /** render */
  return (
    <div className={styles.audio}>
      <audio src={info.url} controls onError={onError} />
    </div>
  );
};

export default FileVideo;
