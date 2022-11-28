/*
 * Created by zhangq on 2022/02/01
 * input
 */
import InputNormal, { InputProps, InputRef } from "./Input";
import Password from "./Password";
import Number from "./Number";

export type { InputRef } from "./Input";

const Input = InputNormal as React.ForwardRefExoticComponent<
  InputProps & React.RefAttributes<InputRef>
> & {
  Password: typeof Password;
  Number: typeof Number;
};

Input.Password = Password;
Input.Number = Number;

export default Input;
