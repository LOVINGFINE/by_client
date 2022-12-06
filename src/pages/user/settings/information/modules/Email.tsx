/*
 * Created by zhangq on 2022/12/05
 * UpdateEmail
 */
import { FC, useContext, useState } from "react";
import { useNavigate } from "react-router";
import styles from "../style.less";
import FormLayout from "../../components/FormLayout";
import FormCard from "../../components/FormCard";
import { Form, Input, message } from "@/packages/design";
import { userContext } from "@/plugins/user";
import {
  setUserEmail,
  sendUserEmailUpdateCode,
} from "@/pages/user/apis/setting";
import SendCodeTimer from "@/pages/user/components/SendCodeTimer";
import { verifyEmail } from "@/plugins/convert";

const UpdateEmail: FC = () => {
  const navigate = useNavigate();
  const context = useContext(userContext);
  /** @State */
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState("");
  const [timer, setTimer] = useState<boolean>(false);
  const okDisable = code.length !== 6 || !verifyEmail(email);
  /**
   * @Methods
   */
  function onOk() {
    setLoading(true);
    setUserEmail({
      email,
      code,
    })
      .then((res) => {
        context.setUser({
          username: res.username,
          usernameUpdated: res.usernameUpdated,
        });
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
    sendUserEmailUpdateCode().then(() => {
      message.success("发送成功");
      setTimer(true);
    });
  }

  function onBack() {
    navigate({
      search: ``,
    });
  }

  /** @render */
  return (
    <FormLayout>
      <FormCard
        title={"修改邮箱"}
        onOk={onOk}
        okLoading={loading}
        okDisable={okDisable}
      >
        <Form.Item label={"原有邮箱"}>
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
        <Form.Item label={"新的邮箱"}>
          <Input
            size="large"
            value={email}
            change={setEmail}
            placeholder="请输入新的邮箱"
          />
        </Form.Item>
      </FormCard>
    </FormLayout>
  );
};

export default UpdateEmail;
