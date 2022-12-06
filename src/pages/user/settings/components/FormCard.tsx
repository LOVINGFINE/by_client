/*
 * Created by zhangq on 2022/12/05
 * FormCard
 */
import { FC } from "react";
import styles from "./style.less";
import { Button } from "@/packages/design";
import { useNavigate } from "react-router";

const FormCard: FC<FormCardProps> = ({
  title,
  actions,
  children,
  footer,
  okDisable,
  okLoading,
  okText = "确认修改",
  footerLink,
  onOk,
}) => {
  const navigate = useNavigate();

  const footerElement = (() => {
    if (footer === null) {
      return <></>;
    }
    if (footer) {
      return footer;
    }
    return (
      <div className={styles["formCard-bottom"]}>
        <div style={{ flex: 1 }}>{footerLink}</div>
        <Button
          size="large"
          type="primary"
          disabled={okDisable}
          loading={okLoading}
          onClick={onOk}
        >
          {okText}
        </Button>
      </div>
    );
  })();

  function onBack() {
    navigate({
      search: ``,
    });
  }

  /** @render */
  return (
    <div className={styles["formCard"]}>
      <div className={styles["formCard-top"]}>
        <Button size="large" icon="long-arrow-left" round onClick={onBack} />
        <div className={styles["formCard-title"]}>{title}</div>
        {actions}
      </div>
      <div className={styles["formCard-content"]}>{children}</div>
      {footerElement}
    </div>
  );
};

/**
 * @interface props
 */
export interface FormCardProps {
  title: React.ReactNode;
  actions?: React.ReactNode;
  children?: React.ReactNode;
  okText?: React.ReactNode;
  okDisable?: boolean;
  okLoading?: boolean;
  footer?: null | React.ReactNode;
  footerLink?: React.ReactNode;
  onOk?(): void;
}

export default FormCard;
