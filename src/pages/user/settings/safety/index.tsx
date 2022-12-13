/*
 * Created by zhangq on 2022/11/14
 * UserInformation
 */
import { FC } from "react";
import styles from "./style.less";
import { useNavigate, useSearchParams } from "react-router-dom";
// import Option from "../components/Option";
// import UserCard from "../components/UserCard";
import ActiveHistoryCard from "../components/ActiveHistoryCard";

const UserInformation: FC = () => {
  const navigate = useNavigate();
  const [query] = useSearchParams();
  const update = query.get("update");
  // const password = "*************";

  function onNavUpdate(type: string) {
    navigate({
      search: `?update=${type}`,
    });
  }
  onNavUpdate;

  /** @render */
  switch (update) {
    default:
      return (
        <div className={styles["safety"]}>
          <ActiveHistoryCard />
        </div>
      );
  }
};

export default UserInformation;
