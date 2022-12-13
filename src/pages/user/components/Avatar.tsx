/*
 * Created by zhangq on 2022/11/14
 * UserAvatar
 */
import { Icon } from "@/packages/design";
import { useClassNames } from "@/packages/design/utils/style";
import { User } from "@/pages/user/type";
import { FC } from "react";
import styles from "./style.less";
const cn = useClassNames(styles);

const UserAvatar: FC<UserAvatarProps> = ({
  size = "default",
  user,
  refresh,
  onRefresh,
}) => {
  const firstCode = (() => {
    const { nickname, username } = user;
    return nickname[0] || username[0];
  })();
  const avatarUrl = user.avatar;

  function onClick() {
    if (refresh && onRefresh) {
      onRefresh();
    }
  }
  /** render */
  return (
    <div className={cn(["userAvatar", `userAvatar-${size}`])} onClick={onClick}>
      {avatarUrl ? <img src={avatarUrl} /> : firstCode}
      {refresh && (
        <div
          className={cn(["userAvatar-refresh", `userAvatar-refresh-${size}`])}
        >
          <Icon name="refresh" />
        </div>
      )}
    </div>
  );
};

interface UserAvatarProps {
  size?: "default" | "small" | "large";
  refresh?: boolean;
  user: User;
  onRefresh?(): void;
}
export default UserAvatar;
