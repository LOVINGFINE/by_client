/*
 * Created by zhangq on 2021/07/01
 * app
 */
import { FC } from "react";
import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "@/plugins/router";
import { LocaleProvider } from "@/plugins/i18n";
import { UserProvider } from "@/plugins/user";
import routes, { ACCESS_TOKEN_NEGLECT } from "@/config/router";
import i18n from "@/locales";

const App: FC = () => {
  /** render */
  return (
    <BrowserRouter>
      <UserProvider neglect={ACCESS_TOKEN_NEGLECT}>
        <LocaleProvider initial={i18n} defaultNs="zh-CN">
          {AppRouter(routes)}
        </LocaleProvider>
      </UserProvider>
    </BrowserRouter>
  );
};

export default App;
