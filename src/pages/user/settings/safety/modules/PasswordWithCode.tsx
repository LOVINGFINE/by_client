/*
 * Created by zhangq on 2022/12/05
 * UpdatePasswordWithCode
 */
import { FC, useContext, useState } from "react";
import { useNavigate } from "react-router";
import styles from "../style.less";
import FormCard from "../../components/FormCard";
import { Button, Form, Input, message } from "@/packages/design";
import { userContext } from "@/plugins/user";
import {
  setUserPasswordWithCode,
  sendUserPasswordWithCode,
} from "@/pages/user/apis/setting";
import SendCodeTimer from "@/pages/user/components/SendCodeTimer";
import FormLayout from "../../components/FormLayout";

const UpdatePasswordWithCode: FC = () => {
  const navigate = useNavigate();
  const context = useContext(userContext);
  /** @State */
  const [password, setPassword] = useState<string>("");
  const [confirmation, setConfirmation] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState("");
  const [timer, setTimer] = useState<boolean>(false);

  const okDisable =
    code.length !== 6 || password.length < 8 || password !== confirmation;
  /**
   * @Methods
   */
  function onOk() {
    setLoading(true);
    setUserPasswordWithCode({
      password,
      code,
    })
      .then(() => {
        message.success("修改成功");
      })
      .finally(() => {
        setTimeout(() => {
          setLoading(false);
          onBack();
        }, 1500);
      });
  }

  function onSendCode() {
    sendUserPasswordWithCode().then(() => {
      message.success("发送成功");
      setTimer(true);
    });
  }

  function onBack() {
    navigate({
      search: ``,
    });
  }

  function onNavOld() {
    navigate(
      {
        search: `?update=password-with-old`,
      },
      {
        replace: true,
      }
    );
  }
  /** @render */
  return (
    <FormLayout>
      <FormCard
        title={"修改密码-邮箱验证"}
        onOk={onOk}
        okLoading={loading}
        okDisable={okDisable}
        footerLink={
          <Button link type="primary" onClick={onNavOld}>
            通过原密码修改
          </Button>
        }
      >
        <Form.Item label={"当前邮箱"}>
          <Input disabled={true} size="large" value={context.user.email} />
        </Form.Item>
        <Form.Item label="验证码">
          <div className={styles["emailCode"]}>
            <Input
              style={{
                flex: 1,
              }}
              placeholder="请输入6位验证码"
              value={code}
              change={setCode}
            />
            <SendCodeTimer
              onVisible={setTimer}
              onSend={onSendCode}
              visible={timer}
            />
          </div>
        </Form.Item>
        <Form.Item label={"新密码"}>
          <Input.Password
            size="large"
            value={password}
            change={setPassword}
            placeholder="请输入新密码"
          />
        </Form.Item>
        <Form.Item label={"确认密码"}>
          <Input.Password
            size="large"
            value={confirmation}
            change={setConfirmation}
            placeholder="请输入确认密码"
          />
        </Form.Item>
      </FormCard>
    </FormLayout>
  );
};

export default UpdatePasswordWithCode;
