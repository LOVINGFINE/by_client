/*
 * Created by zhangq on 2022/11/05
 * sign up
 */
import { FC, useContext, useState } from "react";
import { useNavigate } from "react-router";
import { Icon, Spanging } from "@/packages/design";
import styles from "./style.less";
import { userContext } from "@/plugins/user";

const UserSettingsPage: FC = () => {
  const context = useContext(userContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  /** render */
  return <Spanging loading={loading}></Spanging>;
};

export default UserSettingsPage;
