import "./style.less";
import GridNormal, { GridProps } from "./Grid";
import Column, { ColumnProps } from "./Column";
import Row, { RowProps } from "./Row";

export type { GridProps, RowProps, ColumnProps };

const Grid = GridNormal as React.ForwardRefExoticComponent<GridProps> & {
  Column: typeof Column;
  Row: typeof Row;
};

Grid.Column = Column;
Grid.Row = Row;

export default Grid;
