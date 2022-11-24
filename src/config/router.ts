import { RouteProp } from "@/plugins/router";
const routes: RouteProp[] = [
  {
    path: "/",
    view: "pages/homepage",
    title: "首页",
  },
  {
    path: "/sign-in",
    view: "pages/user/sign-in",
    title: "用户 · 登录",
  },
  {
    path: "/sign-up",
    view: "pages/user/sign-up",
    title: "用户 · 注册",
  },
  {
    path: "/user/settings",
    view: "pages/user/settings",
    title: "用户 · 管理",
  },
  {
    path: "/sheets",
    view: "pages/sheet",
    title: "表格",
  },
  {
    path: "/sheets/:sheetId",
    view: "pages/sheet/editor",
    title: "表格 · 编辑",
  },
  {
    path: "*",
    view: "pages/error/404",
    title: "找不到页面",
  },
];

export const ACCESS_TOKEN_NEGLECT = ["/sign-in", "/sign-up"];

export default routes;
