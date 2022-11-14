import { FC, CSSProperties } from "react";
import "./assets.js";

export interface IconProps {
  name?: string;
  size?: number;
  className?: string;
  style?: CSSProperties;
}
const Icon: FC<IconProps> = ({
  name,
  size,
  className,
  style = {},
}: IconProps): React.ReactElement => {
  const sizeStyle = size ? { fontSize: size } : {};
  return (
    <svg
      className={className}
      style={{ ...sizeStyle, ...style }}
      aria-hidden="true"
    >
      <use xlinkHref={`#${name}`} />
    </svg>
  );
};

export default Icon;
