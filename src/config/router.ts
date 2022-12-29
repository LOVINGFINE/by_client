import { RouteProp } from "@/packages/router";
const routes: RouteProp[] = [
  {
    path: "/__test__",
    view: "pages/__test__/index",
    title: "测试页面",
  },
  {
    path: "/__test__/select",
    view: "pages/__test__/select_date",
    title: "测试页面",
  },
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
    routes: [
      {
        path: "information",
        view: "pages/user/settings/information",
        title: "基本信息",
      },
      {
        path: "safety",
        view: "pages/user/settings/safety",
        title: "账号安全",
      },
    ],
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

export const ACCESS_TOKEN_NEGLECT = ["/sign-in", "/sign-up", "/__test__"];

export default routes;
