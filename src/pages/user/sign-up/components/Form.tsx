/*
 * Created by zhangq on 2022/11/05
 * SignUpForm
 */
import { FC, useState } from "react";
import { Button, Form, Input, message } from "@/packages/design";
import styles from "../../style.less";
import {
  userSendCodeWithEmail,
  userSignUpByEmail,
  verifySendCodeWithEmail,
  verifyWithEmailAccess,
} from "../../apis";
import { UserWithToken } from "../../type";
import { useNavigate } from "react-router";
import SendCodeTimer from "../../components/SendCodeTimer";

const SignUpForm: FC<SignUpFormProps> = ({ onOK }) => {
  const navigate = useNavigate();
  /** @State */
  const [step, setStep] = useState<FormStep>(FormStep.email);
  const [email, setEmail] = useState<string>("");
  const [captcha, setCaptcha] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmation, setConfirmation] = useState<string>("");
  const [timer, setTimer] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const next = (() => {
    if (step === FormStep.password) {
      return "注册帐号";
    }
    return "下一步";
  })();

  const disabled = (() => {
    if (step === FormStep.email) {
      return email.length === 0;
    } else if (step === FormStep.password) {
      return !password || password.length < 8 || password !== confirmation;
    } else if (step === FormStep.captcha) {
      return captcha.length === 0 || captcha.length > 6;
    }
    return false;
  })();

  /**
   * @Methods
   */

  async function onSendCode() {
    return userSendCodeWithEmail(email).then(() => {
      setTimer(true);
      message.success("发送成功");
    });
  }

  function onNext() {
    if (step === FormStep.email) {
      // 验证账号
      onAccent();
    }
    if (step === FormStep.captcha) {
      onCaptcha();
    }
    if (step === FormStep.password) {
      // 登录
      onSubmit();
    }
  }

  function onAccent() {
    verifyWithEmailAccess(email)
      .then(() => {
        setStep(FormStep.captcha);
      })
      .catch((e) => {
        message.warning(e.message);
      });
  }

  function onCaptcha() {
    verifySendCodeWithEmail(email, captcha)
      .then(() => {
        setStep(FormStep.password);
      })
      .catch((e) => {
        message.error(e.message);
      });
  }

  function onSubmit() {
    const payload = {
      email,
      password,
    };
    setLoading(true);
    userSignUpByEmail(payload)
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
    if (FormStep.email !== step) {
      setStep(FormStep.email);
      setPassword("");
      setCaptcha("");
    }
  }

  function onSignUpTo() {
    navigate("/sign-in");
  }

  /** @render */
  return (
    <div className={styles["form"]}>
      {step === FormStep.email && (
        <div className={styles["form-body"]}>
          <Form.Item label="邮箱">
            <Input placeholder="请输入邮箱" value={email} change={setEmail} />
          </Form.Item>
        </div>
      )}
      {step === FormStep.captcha && (
        <div className={styles["form-body"]}>
          <Form.Item label="验证码">
            <div className={styles["form-body-item"]}>
              <Input
                style={{
                  flex: 1,
                }}
                placeholder="请输入6位验证码"
                value={captcha}
                change={setCaptcha}
              />
              <SendCodeTimer
                onVisible={setTimer}
                onSend={onSendCode}
                visible={timer}
              />
            </div>
          </Form.Item>
        </div>
      )}
      {step === FormStep.password && (
        <div className={styles["form-body"]}>
          <Form.Item label={"密码"}>
            <Input.Password
              placeholder="请输入不少于8位的密码"
              value={password}
              change={setPassword}
            />
          </Form.Item>
          <Form.Item label={"确认密码"}>
            <Input.Password
              placeholder="请输入设置的密码以确认"
              value={confirmation}
              change={setConfirmation}
            />
          </Form.Item>
        </div>
      )}
      <div className={styles["submit"]}>
        <Button link type="primary" onClick={onSignUpTo}>
          {"登录已有帐号"}
        </Button>
        <div className={styles["submit-btn"]}>
          {step != FormStep.email && (
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
export interface SignUpFormProps {
  onOK(e: UserWithToken): void;
}

enum FormStep {
  email = "email",
  captcha = "captcha",
  password = "password",
}

export default SignUpForm;
