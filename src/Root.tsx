/*
 * @Author: jianwen.Wang
 * @Date: 2022-01-05 10:53:48
 * @LastEditTime: 2022-01-19 16:31:51
 * @LastEditors: jiawen.wang
 */
/* eslint-disable global-require */
import { FC, useEffect } from "react";
import { Provider } from "react-redux";
import { BrowserRouter, HashRouter, Route, Switch } from "react-router-dom";
import { Web3ContextProvider } from "./hooks/web3Context";

import { i18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";
import { initLocale } from "./locales";

import App from "./App";
import store from "./store";

const Root: FC = () => {
  useEffect(() => {
    initLocale();
  }, []);

  return (
    <Web3ContextProvider>
      <Provider store={store}>
        <I18nProvider i18n={i18n}>
          <HashRouter>
          {/* <BrowserRouter basename={"/#"}> */}
            <App />
          {/* </BrowserRouter> */}
          </HashRouter>
        </I18nProvider>
      </Provider>
    </Web3ContextProvider>
  );
};

export default Root;
