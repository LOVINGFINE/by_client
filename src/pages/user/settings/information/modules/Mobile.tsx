/*
 * Created by zhangq on 2022/12/05
 * UpdateMobile
 */
import { FC, useContext, useEffect, useState } from "react";
import FormLayout from "../../components/FormLayout";
import FormCard from "../../components/FormCard";
import { Form, Input, message } from "@/packages/design";
import { userContext } from "@/plugins/user";
import { setUserMobile } from "@/pages/user/apis/setting";
import { verifyMobile } from "@/plugins/convert";

const UpdateMobile: FC = () => {
  const context = useContext(userContext);
  /** @State */
  const [mobile, setMobile] = useState("");
  const [loading, setLoading] = useState(false);
  const okDisable = !verifyMobile(mobile) && mobile !== context.user.mobile;

  /** @Effect */
  useEffect(() => {
    setMobile(context.user.mobile);
  }, [context.user.mobile]);

  /**
   * @Methods
   */
  function onOk() {
    setLoading(true);
    setUserMobile(mobile)
      .then((res) => {
        context.setUser({
          mobile: res.mobile,
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
        title={"修改手机号"}
        onOk={onOk}
        okLoading={loading}
        okDisable={okDisable}
      >
        <Form.Item>
          <Input
            size="large"
            value={mobile}
            change={setMobile}
            placeholder="请输入手机号"
          />
        </Form.Item>
      </FormCard>
    </FormLayout>
  );
};

export default UpdateMobile;
