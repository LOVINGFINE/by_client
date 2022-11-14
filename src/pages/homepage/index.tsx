/*
 * Created by zhangq on 2022/10/26
 * homepage
 */
import { FC, useState } from "react";
// import styles from "./style.less";
import { Switch, Spanging } from "@/packages/design";

const Homepage: FC = () => {
  /** @State */

  const [loading, setloading] = useState(false);
  /**
   * @Methods
   */
  return <Spanging loading={loading}></Spanging>;
};

export default Homepage;
