/*
 * Created by zhangq on 2022/12/15
 * CanvasSheet
 */
import { FC, useEffect, useState, useRef } from "react";
import { Column, DataSource, Row } from "./type";

const CanvasSheet: FC<CanvasSheetProps> = ({ dataSource }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const default_height = 28;
  const default_width = 120;
  const [grid, setGrid] = useState({
    width: 0,
    height: 0,
  });

  /** @State */
  /** @Effect */
  useEffect(() => {
    onMountSize();
  }, [dataSource]);

  useEffect(() => {
    onDraw();
  }, [grid, canvasRef.current]);
  /**
   * @Methods
   */
  function onMountSize() {
    const height = dataSource.length * default_height;
    const width = dataSource[0] ? dataSource[0].length * default_width : 0;
    setGrid({
      width,
      height,
    });
  }

  function onDraw() {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      if (ctx) {
        const { width, height } = grid;
        for (let i = 0; i < dataSource.length; i++) {
          ctx.beginPath();
          ctx.moveTo(i * default_width - 1, 0);
          ctx.lineTo(i * default_width - 1, height);
          ctx.strokeStyle = "red";
          ctx.lineWidth = 1;
          ctx.stroke();
          ctx.closePath();
        }
        for (let i = 0; i < dataSource[0].length; i++) {
          ctx.beginPath();
          ctx.moveTo(0, i * default_height - 1);
          ctx.lineTo(width, i * default_height - 1);
          ctx.strokeStyle = "red";
          ctx.stroke();
          ctx.closePath();
        }
      }
    }
  }
  /** @render */
  return (
    <canvas
      ref={canvasRef}
      style={{
        ...grid,
        background: "#000",
      }}
    ></canvas>
  );
};

/**
 * @interface props
 */
export interface CanvasSheetProps {
  dataSource: DataSource;
  columns?: Column[];
  rows?: Row[];
}

export default CanvasSheet;
