/* eslint-disable @typescript-eslint/no-explicit-any */
/*
 * Created by zhangq on 2022/03/09
 * 虚拟 滚动
 */
import  { ReactElement, FC, useEffect, useState, useRef } from "react";
import { reduceChildrenSource } from "./utils";
import "./VirtualScroll.less";

/**
 * @interface props
 */
export interface VirtualScrollProps {
  prefix?: string;
  children?: ReactElement[] | ReactElement;
  expandKeys?: string[];
  options?: {
    extra?: number;
  };
}
const VirtualScroll: FC<VirtualScrollProps> = ({
  children,
  prefix = "dyl",
  options = {},
}: VirtualScrollProps): ReactElement => {
  const { extra = 100 } = options;
  const [loading, setLoading] = useState(true);
  const [scrollHeight, setScrollHeight] = useState(0);
  const [total, setTotal] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);
  const [childrenElement, setChildrenElement] = useState<
    {
      offset: {
        x: number;
        y: number;
        width: number;
        height: number;
      };
      child: ReactElement;
    }[]
  >([]);
  const wrapper = useRef(null);
  const content = useRef(null);

  /**
   * @method
   */
  function setDataSource(node: any): void {
    setTimeout(() => {
      const { offsetHeight, childNodes = [] } = node;
      setTotal(offsetHeight);
      const targets: {
        offset: {
          x: number;
          y: number;
          width: number;
          height: number;
        };
        child: ReactElement;
      }[] = [];
      let origins: ReactElement[] = [];
      if (children) {
        if (Array.isArray(children)) {
          origins = children;
        } else {
          origins = [children];
        }
      }
      childNodes.forEach((ele: any, i: any) => {
        const {
          offsetHeight = 0,
          offsetWidth = 0,
          offsetTop = 0,
          offsetLeft = 0,
        } = ele;

        targets.push({
          offset: {
            x: offsetLeft,
            y: offsetTop,
            height: offsetHeight,
            width: offsetWidth,
          },
          child: origins[i],
        });
      });
      setChildrenElement(targets);
      setLoading(false);
    });
  }

  const onScroll = (event: any) => {
    const scrollTop = event.target.scrollTop;
    setScrollTop(scrollTop);
  };

  /** LifeCycle */
  useEffect(() => {
    if (content.current) {
      setDataSource(content.current);
    }
  }, [content]);

  useEffect(() => {
    // init
    if (wrapper.current) {
      const { offsetHeight } = wrapper.current;
      setScrollHeight(offsetHeight);
    }
  }, [wrapper]);

  /** render */
  return (
    <div
      className={`${prefix}-virtual-scroll-wrapper`}
      onScroll={onScroll}
      ref={wrapper}
    >
      <div
        ref={content}
        style={loading ? { opacity: 0 } : { height: total }}
        className={`${prefix}-virtual-scroll`}
      >
        {loading
          ? children
          : reduceChildrenSource(childrenElement, {
              scrollHeight,
              scrollTop,
              extra,
              className: `${prefix}-virtual-scroll-item`,
            })}
      </div>
    </div>
  );
};

export default VirtualScroll;
