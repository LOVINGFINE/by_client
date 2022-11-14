/*
 * Created by zhangq on 2022/11/05
 * AccentForm
 */
import { FC, useState } from "react";
import { Input, message } from "@/packages/design";
import styles from "../style.less";
import SubmitForm from "./Submit";
import { verifyEmail } from "@/plugins/convert";
import { useClassNames } from "@/plugins/style";

const cn = useClassNames(styles);
const AccentForm: FC<AccentFormProps> = ({ onOk, current }) => {
  /** @State */
  const [email, setEmail] = useState<string>("loving@163.com");
  const disabled = (() => {
    return !email;
  })();
  /**
   * @Methods
   */
  function onNext() {
    // 校验格式
    if (verifyEmail(email)) {
      onOk(email);
    } else {
      message.warning("邮箱格式错误,请重新输入");
    }
  }
  /** render */
  return (
    <div
      className={cn({
        accent: true,
        "accent-current": current,
      })}
    >
      <div className={styles["form-item"]}>
        <div className={styles["form-item-label"]}>{"邮箱"}</div>
        <div className="form-item-body">
          <Input placeholder="请输入您的邮箱" value={email} change={setEmail} />
        </div>
      </div>
      <SubmitForm disabled={disabled} next={"下一步"} onNext={onNext} />
    </div>
  );
};

/**
 * @interface props
 */
export interface AccentFormProps {
  onOk(e: string): void;
  current: boolean;
}

export default AccentForm;
