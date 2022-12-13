/*
 * Created by zhangq on 2022/02/01
 * input
 */
import "./style.less";
import ButtonNormal, { ButtonProps } from "./Button";
import RoundButton, { RoundButtonProps } from "./Round";

export type { ButtonProps, RoundButtonProps };

const Button = ButtonNormal as React.ForwardRefExoticComponent<ButtonProps> & {
  Round: typeof RoundButton;
};

Button.Round = RoundButton;

export default Button;
