/*
 * Created by zhangq on 2022/11/05
 * FormSubmit
 */
import { FC } from "react";
import { Button } from "@/packages/design";
import styles from "../style.less";
import { useNavigate } from "react-router";

const FormSubmit: FC<FormSubmitProps> = ({
  onNext,
  next,
  onPrev,
  prev,
  disabled,
}) => {
  const navigate = useNavigate();
  /**
   * @Methods
   */
  function onSingUpto() {
    navigate("/sign-up");
  }

  /** render */
  return (
    <div className={styles["submit"]}>
      <Button link type="primary" onClick={onSingUpto}>
        {"创建新账号"}
      </Button>
      <div className={styles["submit-btn"]}>
        {prev ? (
          <Button link onClick={() => onPrev && onPrev()}>
            {prev}
          </Button>
        ) : (
          <></>
        )}
        <Button
          disabled={disabled}
          onClick={onNext}
          size="large"
          type="primary"
        >
          {next}
        </Button>
      </div>
    </div>
  );
};

/**
 * @interface props
 */
export interface FormSubmitProps {
  next: string;
  prev?: string;
  onPrev?(): void;
  onNext(): void;
  disabled: boolean;
}

export default FormSubmit;
