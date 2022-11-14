/*
 * Created by zhangq on 2022/11/05
 * PasswordForm
 */
import { FC, useState } from "react";
import { Input } from "@/packages/design";
import styles from "../style.less";
import SubmitForm from "./Submit";
import { useClassNames } from "@/plugins/style";

const cn = useClassNames(styles);
const PasswordForm: FC<PasswordFormProps> = ({ onOk, onCancel, current }) => {
  /** @State */
  const [password, setPassword] = useState<string>("12345678");

  const disabled = (() => {
    return !password || password.length < 8;
  })();
  /**
   * @Methods
   */
  function onSubmit() {
    onOk(password);
  }

  /** render */
  return (
    <div
      className={cn({
        password: true,
        "password-current": current,
      })}
    >
      <div className={styles["form-item"]}>
        <div className={styles["form-item-label"]}>{"密码"}</div>
        <div className="form-item-body">
          <Input
            placeholder="请输入登录密码"
            value={password}
            change={setPassword}
          />
        </div>
      </div>
      <SubmitForm
        disabled={disabled}
        prev={"上一步"}
        onPrev={onCancel}
        next={"登 录"}
        onNext={onSubmit}
      />
    </div>
  );
};

/**
 * @interface props
 */
export interface PasswordFormProps {
  current: boolean;
  onOk(e: string): void;
  onCancel(): void;
}

export default PasswordForm;
