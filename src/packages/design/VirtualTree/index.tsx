/* eslint-disable @typescript-eslint/no-explicit-any */
/*
 * Created by zhangq on 2022/03/09
 * 虚拟 滚动
 */
import React, { ReactElement, FC, useEffect, useState, useRef } from "react";
import { reduceTreeSource } from "./utils";
import "./VirtualTree.less";
import TreeList, { NodeProps } from "./TreeList";

/**
 * @interface props
 */
export interface VirtualTreeProps {
  dataSource: any[];
  prefix?: string;
  children?: FC<NodeProps>;
  expandKeys?: string[];
  nodeClick?(event: MouseEvent, record: any): void;
  nodeDbClick?(event: MouseEvent, record: any): void;
  options?: {
    height?: number;
    extra?: number;
    childrenKey?: string;
  };
}
const VirtualTree: FC<VirtualTreeProps> = ({
  children,
  dataSource,
  prefix = "dyl",
  nodeDbClick,
  options = {},
  nodeClick,
}: VirtualTreeProps): ReactElement => {
  const { height = 32, extra = 10, childrenKey = "children" } = options;
  const [offsetHeight, setOffsetHeight] = useState(0);
  const [expandKeys, setExpendKeys] = useState<string[]>([]);
  const [scrollTop, setScrollTop] = useState(0);
  const wrapper = useRef(null);

  const getConfig = (): { start: number; end: number; height: number } => {
    const start = scrollTop > height * extra ? scrollTop - height * extra : 0;
    const end = offsetHeight + extra * height * 2;
    return {
      start,
      end,
      height,
    };
  };
  /** LifeCycle */
  useEffect(() => {
    // init
    if (wrapper.current) {
      const { offsetHeight } = wrapper.current;
      setOffsetHeight(offsetHeight);
    }
  }, [wrapper]);

  /**
   * @method
   */
  const onScroll = (event: any) => {
    const scrollTop = event.target.scrollTop;
    setScrollTop(Math.floor(scrollTop / height) * height);
  };
  const expand = (record: any) => {
    if (record.isExpand) {
      setExpendKeys(expandKeys.filter((ele) => ele !== record.nodeKey));
    } else {
      setExpendKeys([...expandKeys, record.nodeKey]);
    }
  };
  /** render */
  return (
    <div
      className={`${prefix}-vc-tree-wrapper`}
      onScroll={onScroll}
      ref={wrapper}
    >
      <TreeList
        dataSource={reduceTreeSource(dataSource, {
          height,
          extra,
          expandKeys,
          childrenKey,
        })}
        config={getConfig()}
        prefix={prefix}
        expand={expand}
        nodeDbClick={nodeDbClick}
        nodeClick={nodeClick}
      >
        {children}
      </TreeList>
    </div>
  );
};

export default VirtualTree;
