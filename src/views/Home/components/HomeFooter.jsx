import HomeLinkList from "./HomeLinkList";
import React from "react";
import "../styles/homeFooter.scss";

function HomeFooter() {
  const bottomLogo = require("../../../assets/new_home/footer-logo.png");
  return (
    <div className="footer-content">
      <div className="link-list-outside">
        <HomeLinkList />
      </div>
      <img className="footer-logo" src={bottomLogo.default} alt="" />
      <p className="footer-copy-right">&copy; Copyright 2022 NoahArkDAO All rights reserved.</p>
    </div>
  );
}
export default HomeFooter;
