/*
 * Created by zhangq on 2021/07/02
 * Spanging
 */
import { ReactElement, FC } from "react";
import "./style.less";
import Loading, { LoadingType } from "./Loading";

const Spanging: FC<SpangingProps> = ({
  children,
  size,
  loading = false,
  type = "stripes",
}): ReactElement => {
  /** render */
  return (
    <>
      {loading ? (
        <div className="spanging">
          <Loading type={type} size={size} />
        </div>
      ) : (
        children
      )}
    </>
  );
};
export interface SpangingProps {
  children?: ReactElement | ReactElement[];
  size?: "middle" | "small" | "large";
  type?: LoadingType;
  loading?: boolean;
}
export default Spanging;
