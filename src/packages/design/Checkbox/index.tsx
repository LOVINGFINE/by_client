import "./style.less";
import CheckboxNormal, { CheckboxProps } from "./Checkbox";
import Group, { CheckboxGroupProps } from "./Group";

export type { CheckboxProps, CheckboxGroupProps };

const Checkbox =
  CheckboxNormal as React.ForwardRefExoticComponent<CheckboxProps> & {
    Group: typeof Group;
  };

Checkbox.Group = Group;

export default Checkbox;
