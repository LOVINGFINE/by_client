/*
 * Created by zhangq on 2022/12/05
 * UpdateNickname
 */
import { FC, useContext, useEffect, useState } from "react";
import FormLayout from "../../components/FormLayout";
import FormCard from "../../components/FormCard";
import { Form, Input, message } from "@/packages/design";
import { userContext } from "@/pages/user/provider";
import { setUserNickname } from "@/pages/user/apis";

const UpdateNickname: FC = () => {
  const context = useContext(userContext);
  /** @State */
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const okDisable = name.length === 0 || name === context.user.nickname;

  /** @Effect */
  useEffect(() => {
    setName(context.user.nickname);
  }, [context.user.nickname]);

  /**
   * @Methods
   */
  function onOk() {
    setLoading(true);
    setUserNickname(name)
      .then((res) => {
        context.setUser({
          nickname: res.nickname,
        });
        message.success("修改成功");
      })
      .finally(() => {
        setLoading(false);
      });
  }
  /** render */
  return (
    <FormLayout>
      <FormCard
        title={"修改昵称"}
        onOk={onOk}
        okLoading={loading}
        okDisable={okDisable}
      >
        <Form.Item>
          <Input
            size="large"
            value={name}
            change={setName}
            placeholder="请输入昵称"
          />
        </Form.Item>
      </FormCard>
    </FormLayout>
  );
};

export default UpdateNickname;
