/*
 * Created by zhangq on 2022/12/05
 * UpdatePasswordOld
 */
import { FC, useState } from "react";
import { useNavigate } from "react-router";
import FormCard from "../../components/FormCard";
import { Button, Form, Input, message } from "@/packages/design";
import { setUserPasswordOld } from "@/pages/user/apis";
import FormLayout from "../../components/FormLayout";

const UpdatePasswordOld: FC = () => {
  const navigate = useNavigate();
  /** @State */
  const [old, setOld] = useState("");
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const okDisable =
    old.length < 8 || password.length < 8 || confirmation !== password;
  /**
   * @Methods
   */
  function onOk() {
    setLoading(true);
    setUserPasswordOld({
      old,
      password,
    })
      .then(() => {
        message.success("修改成功");
        setTimeout(() => {
          onBack();
        }, 1500);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function onBack() {
    navigate({
      search: ``,
    });
  }

  function onNavWidthCode() {
    navigate(
      {
        search: `?update=password-with-emailCode`,
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
        title={"修改密码-密码验证"}
        onOk={onOk}
        okLoading={loading}
        okDisable={okDisable}
        footerLink={
          <Button link type="primary" onClick={onNavWidthCode}>
            忘记原密码?
          </Button>
        }
      >
        <Form.Item label={"原密码"}>
          <Input.Password
            size="large"
            value={old}
            change={setOld}
            placeholder="请输入原密码"
          />
        </Form.Item>
        <Form.Item label={"新密码"}>
          <Input.Password
            size="large"
            value={password}
            change={setPassword}
            placeholder="请输入确认密码"
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

export default UpdatePasswordOld;
