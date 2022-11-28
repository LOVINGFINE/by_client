import "./style.less";
import RadioNormal, { RadioProps } from "./Radio";
import Group, { RadioGroupProps } from "./Group";

export type { RadioProps, RadioGroupProps };

const Radio = RadioNormal as React.ForwardRefExoticComponent<RadioProps> & {
  Group: typeof Group;
};

Radio.Group = Group;

export default Radio;
