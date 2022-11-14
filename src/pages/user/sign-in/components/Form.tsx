/*
 * Created by zhangq on 2022/11/05
 * SignInForm
 */
import { FC, useState } from "react";
import { message } from "@/packages/design";
import styles from "../style.less";
import AccentForm from "./Accent";
import PasswordForm from "./Password";
import { userSignInByEmail } from "../../apis";
import { UserWithToken } from "../../type";
import { useClassNames } from "@/plugins/style";

const cn = useClassNames(styles);

const SignInForm: FC<SignInFormProps> = ({ onOK }) => {
  /** @State */
  const [step, setStep] = useState<FormStep>(FormStep.accent);
  const [formState, setFormState] = useState<FormState>({
    email: "",
    password: "",
  });
  /**
   * @Methods
   */
  function onAccentNext(email: string) {
    setFormState({
      email,
      password: "",
    });
    setStep(FormStep.password);
  }

  function onSubmit(password: string) {
    const payload = {
      email: formState.email,
      password,
    };
    setFormState(payload);
    userSignInByEmail(payload)
      .then((res) => {
        // 登录成功
        onOK(res);
      })
      .catch((e) => {
        message.error(e.message);
        if (e.code === 412) {
          setFormState({
            email: "",
            password,
          });
        }
        setStep(FormStep.accent);
      });
  }

  function onPasswordPrev() {
    setStep(FormStep.accent);
  }

  /** @render */
  return (
    <div className={cn(["form", `form-${step}`])}>
      <AccentForm current={step === FormStep.accent} onOk={onAccentNext} />
      <PasswordForm
        current={step === FormStep.password}
        onOk={onSubmit}
        onCancel={onPasswordPrev}
      />
    </div>
  );
};

/**
 * @interface props
 */
export interface SignInFormProps {
  onOK(e: UserWithToken): void;
}
enum FormStep {
  accent = "accent",
  password = "password",
}
interface FormState {
  email: string;
  password: string;
}
export default SignInForm;
