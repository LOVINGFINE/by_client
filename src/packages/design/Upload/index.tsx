/*
 * Created by zhangq on 2022/03/11
 * upload
 */
import React, { ReactElement, FC } from "react";
import "./style.less";

const Upload: FC<UploadProps> = ({
  children,
  prefix = "dyl",
}: UploadProps): ReactElement => {
  
  /** @render */
  return <div className={`${prefix}-upload`}>{children}</div>;
};

/**
 * @interface props
 */
export interface UploadProps {
  children?: ReactElement;
  prefix?: string;
}

export default Upload;
