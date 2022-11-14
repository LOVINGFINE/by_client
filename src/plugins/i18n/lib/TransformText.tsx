import { useContext, FC } from "react";
import context from "./context";

const TransformText: FC<TransformTextProps> = ({ name, named }) => {
  const state = useContext(context);
  try {
    const str = state.t(name, named);
    return <>{str}</>;
  } catch (_) {
    console.warn(`locale key ${name} not found`);
    return <></>;
  }
};

export interface TransformTextProps {
  name: string;
  named?: {
    [k: string]: number | string;
  };
}

export default TransformText;
