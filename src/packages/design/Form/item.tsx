/*
 * Created by zhangq on 2022/10/19
 * style
 */
import { FC, ReactElement } from "react";
import styles from "./style.less";

const FormItem: FC<FormItemProps> = ({ children, label }) => {
  /** render */
  return (
    <div className={styles["formItem"]}>
      <div className={styles["formItem-label"]}>{label}</div>
      <div className="formItem-body">{children}</div>
    </div>
  );
};

/**
 * @interface props
 */
export interface FormItemProps {
  children?: ReactElement;
  label?: string | ReactElement;
}

export default FormItem;
