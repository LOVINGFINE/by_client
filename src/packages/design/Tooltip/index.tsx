/*
 * Created by zhangq on 2022/03/11
 * tooltip
 */
import { ReactElement, FC } from "react";
import "./tooltip.less";

/**
 * @interface props
 */
export interface TooltipProps {
  children?: ReactElement;
}
const Tooltip: FC<TooltipProps> = ({
  children,
}: TooltipProps): ReactElement => {
  /** render */
  const toolTip = <span className={`tooltip`}></span>;
  console.log(toolTip);

  return <>{children}</>;
};

export default Tooltip;
