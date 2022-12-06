/*
 * Created by zhangq on 2021/07/02
 * Spanging
 */
import { FC, Fragment } from "react";
import "./style.less";
import Loading, { LoadingType } from "./Loading";

const Spanging: FC<SpangingProps> = ({
  children,
  size,
  loading = false,
  type = "stripes",
}) => {
  /** render */
  return (
    <Fragment>
      {loading ? (
        <div className="spanging">
          <Loading type={type} size={size} />
        </div>
      ) : (
        children
      )}
    </Fragment>
  );
};
export interface SpangingProps {
  children?: React.ReactNode;
  size?: "middle" | "small" | "large";
  type?: LoadingType;
  loading?: boolean;
}
export default Spanging;
