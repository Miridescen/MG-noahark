/*
 * @Author: jianwen.Wang
 * @Date: 2022-01-19 15:34:29
 * @LastEditTime: 2022-01-22 16:52:01
 * @LastEditors: jiawen.wang
 */

import HomeLinkList from "./HomeLinkList";
import ConnectMenu from "./ConnectMenu";
import "../styles/homeHeader.scss";
import { useEffect, useState } from "react";
import { useDebounce } from "../../../hooks/index";
import _ from "lodash";

export default function HomeHeader() {
  const [backgroundClass, setBackgroundClass] = useState(false);

  useEffect(() => {
    const scrollEle = document.getElementById("root") || document.body;
    const handleScroll = (event: any) => {
      const scrollTop =
        (event.srcElement ? event.srcElement.scrollTop : false) ||
        window.pageYOffset ||
        (event.srcElement ? event.srcElement.scrollTop : 0);
      let clientHeight = document.documentElement.clientHeight;
      let scrollHeight = document.documentElement.scrollHeight;
      if (scrollTop > 0) {
        setBackgroundClass(true);
      } else {
        setBackgroundClass(false);
      }
    };

    window.addEventListener("scroll", _.throttle(handleScroll, 300));

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={`${backgroundClass ? "home-header header-background-color" : "home-header"}`}>
      <a href="#" className="home-logo"></a>
      <div className="header-right">
        <div className="link-list-outside">
          <HomeLinkList />
        </div>

        <ConnectMenu />
      </div>
    </header>
  );
}
