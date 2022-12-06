/*
 * Created by zhangq on 2022/11/05
 * SignInForm
 */
import { FC, useState } from "react";
import { Button, Form, Input, message } from "@/packages/design";
import styles from "../../style.less";
import { userSignInAccentAccess, userSignInByAccent } from "../../apis";
import { UserWithToken } from "../../type";
import { useNavigate } from "react-router";

const SignInForm: FC<SignInFormProps> = ({ onOK }) => {
  const navigate = useNavigate();
  /** @State */
  const [step, setStep] = useState<FormStep>(FormStep.accent);
  const [accent, setAccent] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const next = (() => {
    if (step === FormStep.accent) {
      return "下一步";
    }
    return "登录";
  })();

  const disabled = (() => {
    if (step === FormStep.accent) {
      return accent.length === 0;
    }
    if (step === FormStep.password) {
      return !password || password.length < 8;
    }
    return false;
  })();
  /**
   * @Methods
   */
  function onNext() {
    if (step === FormStep.accent) {
      // 验证账号
      onAccent();
    }
    if (step === FormStep.password) {
      // 登录
      onSubmit();
    }
  }

  function onAccent() {
    setLoading(true);
    userSignInAccentAccess(accent)
      .then(() => {
        setStep(FormStep.password);
      })
      .catch((e) => {
        message.error(e.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }
  function onSubmit() {
    const payload = {
      accent,
      password,
    };
    setLoading(true);
    userSignInByAccent(payload)
      .then((res) => {
        // 登录成功
        onOK(res);
      })
      .catch((e) => {
        message.error(e.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function onPrev() {
    if (FormStep.password === step) {
      setStep(FormStep.accent);
      setPassword("");
    }
  }
  function onSignUpTo() {
    navigate("/sign-up");
  }
  /** @render */
  return (
    <div className={styles["form"]}>
      {step === FormStep.accent && (
        <div className={styles["form-body"]}>
          <Form.Item label="账号">
            <Input
              placeholder="请输入用户名/邮箱/手机号"
              value={accent}
              change={setAccent}
            />
          </Form.Item>
        </div>
      )}
      {step === FormStep.password && (
        <div className={styles["form-body"]}>
          <Form.Item label={"密码"}>
            <Input.Password
              placeholder="请输入密码"
              value={password}
              change={setPassword}
            />
          </Form.Item>
        </div>
      )}
      <div className={styles["submit"]}>
        <Button link type="primary" onClick={onSignUpTo}>
          {"创建新账号"}
        </Button>
        <div className={styles["submit-btn"]}>
          {step != FormStep.accent && (
            <Button link onClick={onPrev}>
              上一步
            </Button>
          )}
          <Button
            disabled={disabled}
            onClick={onNext}
            size="large"
            type="primary"
            loading={loading}
          >
            {next}
          </Button>
        </div>
      </div>
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

export default SignInForm;
