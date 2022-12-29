/*
 * Created by zhangq on 2021/07/01
 * App
 */
import { FC } from "react";
import { AppRouter } from "@/packages/router";
import { I18nProvider } from "@/packages/i18n";
import UserProvider from "@/pages/user/provider";
import routes, { ACCESS_TOKEN_NEGLECT } from "@/config/router";
import i18n from "@/locales";

const App: FC = () => {
  /** render */
  return (
    <I18nProvider initial={i18n} defaultNs="zh-CN">
      <UserProvider neglect={ACCESS_TOKEN_NEGLECT}>
        <AppRouter routes={routes} />
      </UserProvider>
    </I18nProvider>
  );
};

export default App;
