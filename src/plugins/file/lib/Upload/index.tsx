/*
 * Created by zhangq on 2022/11/08
 * UploadFileModal
 */
import { Button } from "@/packages/design";
import { FC, useEffect, useState } from "react";
import styles from "./style.less";
// import { useClassNames } from "@/plugins/style";

// const classNames = useClassNames(styles);

const UploadFileModal: FC<UploadFileModalProps> = ({ onOk }) => {
  /** @State */
  const [files, setFiles] = useState<File[]>([]);
  /** @Effect */
  useEffect(() => {}, []);

  /**
   * @Methods
   */
  function onUpload() {
    onOk(files).then(() => {
      setFiles([]);
    });
  }
  /** render */
  return (
    <div className={styles["upload"]}>
      <Button onClick={onUpload}></Button>
    </div>
  );
};

/**
 * @interface props
 */
export interface UploadFileModalProps {
  onOk(e: File[]): Promise<unknown>;
}

export default UploadFileModal;
