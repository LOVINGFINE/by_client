/*
 * Created by zhangq on 2022/08/02
 *
 */
import { ReactElement, FC } from "react";
import { ItemProps } from "../index";
import styles from "../style.less";

const FileAudio: FC<ItemProps> = ({
  info,
  onError,
}: ItemProps): ReactElement => {
  /** @render */
  return (
    <div className={styles.audio}>
      <audio src={info.url} controls onError={onError} />
    </div>
  );
};

export default FileAudio;
