import "./style.less";
import FormNormal, { FormProps } from "./Form";
import Item, { FormItemProps } from "./Item";

export type { FormProps, FormItemProps };

const Form = FormNormal as React.ForwardRefExoticComponent<FormProps> & {
  Item: typeof Item;
};

Form.Item = Item;

export default Form;
