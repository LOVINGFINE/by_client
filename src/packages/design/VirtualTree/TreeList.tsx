/* eslint-disable @typescript-eslint/no-explicit-any */
/*
 * Created by zhangq on 2022/03/10
 * tree list
 */
import React, { ReactElement, FC, useEffect } from "react";
import "./VirtualTree.less";
import Icon from "../Icon";

/**
 * @interface props
 */
export interface NodeProps {
  record: any;
}
export interface TreeListProps {
  dataSource: any[];
  config: {
    start: number;
    end: number;
    height: number;
  };
  children?: FC<NodeProps>;
  prefix: string;
  nodeClick?(event: MouseEvent, record: any): void;
  nodeDbClick?(event: MouseEvent, record: any): void;
  expand(e: any): void;
}
const TreeList: FC<TreeListProps> = ({
  dataSource,
  children,
  config,
  prefix,
  expand,
  nodeClick,
}: TreeListProps): ReactElement => {
  /** LifeCycle */
  useEffect(() => {
    // init
  }, []);

  /** render */

  return (
    <ul
      className={`${prefix}-vc-tree-list`}
      style={{ height: dataSource.length * config.height }}
    >
      {dataSource
        .filter(
          (ele) =>
            ele.translateY >= config.start &&
            config.end + config.start > ele.translateY
        )
        .map((item) => {
          return (
            <li
              key={item.nodeKey}
              onClick={(e: any) => {
                expand(item);
                if (nodeClick) {
                  nodeClick(e, item);
                }
              }}
              onDoubleClick={(e: any) => {
                if (nodeClick) {
                  nodeClick(e, item);
                }
              }}
              className={`${prefix}-vc-tree-list-node`}
              style={{
                paddingLeft: item.level * 14 + 6,
                height: config.height,
                transform: `translateY(${item.translateY}px)`,
              }}
            >
              <span
                onClick={() => expand(item)}
                className={`${prefix}-vc-tree-list-node-expand`}
                style={{
                  transform: `rotate(${item.isExpand ? "90deg" : 0})`,
                }}
              >
                {!item.isLeaf && <Icon name="chevron-right" />}
              </span>
              <div className={`${prefix}-vc-tree-list-node-title`}>
                {children ? children({ record: item }) : item.nodeKey}
              </div>
            </li>
          );
        })}
    </ul>
  );
};

export default TreeList;
