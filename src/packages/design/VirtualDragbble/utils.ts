import { ReactElement, cloneElement } from "react";
/*** @interface */
export interface expendReducesOptions {
  extra: number;
  className: string;
  scrollHeight: number;
  scrollTop: number;
}

/*** @methods */
export function reduceChildrenSource(
  dataSource: {
    offset: {
      x: number;
      y: number;
      width: number;
      height: number;
    };
    child: ReactElement;
  }[],
  options: expendReducesOptions
) {
  const { className, scrollHeight, scrollTop, extra } = options;
  const start = scrollTop - extra > 0 ? scrollTop - extra : 0;
  const end = start + scrollHeight + extra * 2;

  const targets: ReactElement[] = [];
  for (let index = 0; index < dataSource.length; index++) {
    const { child, offset } = dataSource[index];
    const { y, height } = offset;
    const displayY = y + height;
    if (!(displayY < start || y > end)) {
      targets.push(
        cloneElement(child, {
          className,
          style: {
            transform: `translate(${offset.x}px,${offset.y}px)`,
          },
        })
      );
    }
  }

  return targets;
}
