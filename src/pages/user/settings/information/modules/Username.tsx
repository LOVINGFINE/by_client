/*
 * Created by zhangq on 2022/12/05
 * UpdateUsername
 */
import { FC, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import dayjs from "dayjs";
import styles from "../style.less";
import FormLayout from "../../components/FormLayout";
import FormCard from "../../components/FormCard";
import { Form, Icon, Input, message } from "@/packages/design";
import { userContext } from "@/pages/user/provider";
import { setUserUsername } from "@/pages/user/apis";
import { verifyAccent } from "@/plugins/verify";

const afterDays = (time: string) => {
  return dayjs(time).add(30, "d").isBefore(dayjs(new Date()));
};

const UpdateUsername: FC = () => {
  const navigate = useNavigate();

  const context = useContext(userContext);
  /** @State */
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const okDisable = !verifyAccent(name) || name === context.user.username;
  const updateDisable = !afterDays(context.user.usernameUpdated);
  const usernameUpdatedTime = dayjs(context.user.usernameUpdated).format(
    "YYYY-MM-DD HH:mm"
  );
  /** @Effect */
  useEffect(() => {
    setName(context.user.username);
  }, [context.user.username]);

  /**
   * @Methods
   */
  function onOk() {
    setLoading(true);
    setUserUsername(name)
      .then((res) => {
        context.setUser({
          username: res.username,
          usernameUpdated: res.usernameUpdated,
        });
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
  /** render */
  return (
    <FormLayout>
      <FormCard
        title={"修改用户名"}
        onOk={onOk}
        okLoading={loading}
        okDisable={okDisable}
      >
        <div className={styles["form-desc"]}>
          上次修改时间: {usernameUpdatedTime}
        </div>
        <Form.Item>
          <Input
            disabled={updateDisable}
            size="large"
            value={name}
            change={setName}
            placeholder="请输入昵称"
          />
        </Form.Item>
        {updateDisable ? (
          <div className={styles["form-warn"]}>
            <Icon name="exclamation" style={{ marginRight: 4 }} />
            {"距离上次修改时间不足30天,当前不可修改"}
          </div>
        ) : (
          <div className={styles["update-desc"]}>
            {
              "字母开头，允许字母、数字、-、_、&、!、|、=、+, 8-32个字节.30天内只可修改一次"
            }
          </div>
        )}
      </FormCard>
    </FormLayout>
  );
};

export default UpdateUsername;
