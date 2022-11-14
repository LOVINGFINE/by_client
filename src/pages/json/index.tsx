/*
 * Created by zhangq on 2022/07/22
 *
 */
import JsonTree from "@/packages/json";
import { ReactElement, FC, useEffect } from "react";
// import { testRequest } from "@/service";
const TestPage: FC = (): ReactElement => {
  useEffect(() => {
    // testRequest().then((res) => {
    //   console.log(res);
    // });
  }, []);
  /** render */
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "#f7f7f7",
        padding: 50,
      }}
    >
      <div
        style={{
          height: "100%",
          backgroundColor: "#fff",
        }}
      >
        <JsonTree></JsonTree>
      </div>
    </div>
  );
};

export default TestPage;
