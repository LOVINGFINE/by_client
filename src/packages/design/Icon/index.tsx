import { FC, CSSProperties, MouseEvent } from "react";
import "./assets.js";

export interface IconProps {
  name?: string;
  size?: number;
  className?: string;
  style?: CSSProperties;
  onClick?(e?: MouseEvent): void;
}
const Icon: FC<IconProps> = ({
  name,
  size,
  className,
  style = {},
  onClick,
}: IconProps): React.ReactElement => {
  const sizeStyle = size ? { fontSize: size } : {};
  return (
    <svg
      className={className}
      style={{ ...sizeStyle, ...style }}
      aria-hidden="true"
      onClick={onClick}
    >
      <use xlinkHref={`#${name}`} />
    </svg>
  );
};

export default Icon;
