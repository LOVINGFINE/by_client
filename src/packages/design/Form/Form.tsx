/*
 * Created by zhangq on 2022/10/19
 * Form
 */
import { FC } from "react";
import "./style.less";

const Form: FC<FormProps> = ({}) => {
  /** render */
  return <div className="form"></div>;
};

/**
 * @interface props
 */
export interface FormProps {
  children?: React.ReactNode;
}

export default Form;
