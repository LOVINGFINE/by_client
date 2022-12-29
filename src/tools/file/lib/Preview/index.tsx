/*
 * Created by zhangq on 2022/08/02
 * 预览 文件
 */
import { useState } from "react";
import { ReactElement, FC } from "react";
import { FileInfo, FileType } from "../../type";
// import { file_types } from "../../final";
import { readFileInfo } from "../utils";
import styles from "./style.less";
import FileImage from "./modules/image";
import FileVideo from "./modules/video";
import FileAudio from "./modules/audio";

const FilePreviewer: FC<FilePreviewerProps> = ({
  dataSource,
}: FilePreviewerProps): ReactElement => {
  /** @State */
  const [error, setError] = useState(false);
  const info = readFileInfo(dataSource);
  /** render */
  if (error) {
    return <div className={styles["preview-error"]}></div>;
  }

  switch (info.type) {
    case FileType.Image:
      return <FileImage info={info} onError={() => setError(true)} />;
    case FileType.Video:
      return <FileVideo info={info} onError={() => setError(true)} />;
    case FileType.Audio:
      return <FileAudio info={info} onError={() => setError(true)} />;
    default:
      return <></>;
  }
};

/**
 * @interface props
 */
export interface FilePreviewerProps {
  dataSource: FileInfo | File;
}

export interface ItemProps {
  info: FileInfo;
  onError?(): void;
}

export default FilePreviewer;
