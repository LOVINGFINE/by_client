/*
 * Created by zhangq on 2022/12/15
 * __test__
 */
import { FC, useEffect, useState } from "react";
import { Button, DatePicker } from "@/packages/design";

const __test__: FC<__test__Props> = ({}) => {
  /** @State */
  const [date, setDate] = useState(new Date());
  /** @Effect */
  useEffect(() => {}, []);

  /**
   * @Methods
   */

  /** render */
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Button></Button>
      <div
        style={{
          width: 220,
          height: 32,
          backgroundColor: "#ddd",
        }}
      >
        <DatePicker value={date} onChange={setDate} />
      </div>
      <h1>{date.toString()}</h1>
    </div>
  );
};

/**
 * @interface props
 */
export interface __test__Props {}

export default __test__;
