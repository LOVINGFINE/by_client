/*
 * Created by zhangq on 2022/12/05
 * UpdateAvatar
 */
import { FC, useContext } from "react";
import styles from "../style.less";
import FormLayout from "../../components/FormLayout";
import FormCard from "../../components/FormCard";
import { Button, message } from "@/packages/design";
import { userContext } from "@/pages/user/provider";
import { setUserAvatar } from "@/pages/user/apis";
import { uploadFile } from "@/plugins/file";

const UpdateAvatar: FC = () => {
  const context = useContext(userContext);
  /**
   * @Methods
   */
  function onOk() {
    uploadFile((file) => {
      setUserAvatar(file as File).then((res) => {
        context.setUser({
          avatar: res.avatar,
        });
        message.success("修改成功");
      });
    });
  }
  /** render */
  return (
    <FormLayout>
      <FormCard footer={null} title={"更换头像"}>
        <div className={styles["avatarValue"]}>
          <img src={context.user.avatar} />
        </div>
        <Button size="large" onClick={onOk}>
          更换头像
        </Button>
      </FormCard>
    </FormLayout>
  );
};

export default UpdateAvatar;
