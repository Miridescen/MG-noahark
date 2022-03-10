/*
 * @Author: jianwen.Wang
 * @Date: 2022-01-19 14:40:32
 * @LastEditTime: 2022-01-24 10:03:50
 * @LastEditors: jiawen.wang
 */
import { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { Button, Typography, Box } from "@material-ui/core";
import moment from "moment";

import { error } from "../../slices/MessagesSlice";

import HomeHeader from "./components/HomeHeader";
import BannerBottom from "./components/HomeBottom";
import HomeMigrate from "./components/HomeMigrate";
import DaoInformationElement from "./components/DaoInformationElement";
import HomeFooter from "./components/HomeFooter";
import coin from "../../assets/new_home/coin.png";
import "./styles/index.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.scss";

import { makeStyles } from "@material-ui/core/styles";
import SwiperCore, { Mousewheel, Pagination } from "swiper";
import PartnerPart from "./components/PartnerPart";

import _ from "lodash";
import { CSSTransition, Transition } from "react-transition-group";

SwiperCore.use([Mousewheel, Pagination]);

const useStyles = makeStyles({
  SwiperStyle: {
    backgroundColor: "#f5f5f5",

    height: "58px",

    width: "100%",
  },
});
const Home: FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [howTitleOneFade, setHowTitleOneFade] = useState(false);
  const [howTitleTwoFade, setHowTitleTwoFade] = useState(false);
  const [howTitleThreeFade, setHowTitleThreeFade] = useState(false);
  const times = moment().format();
  const enterApp = () => {
    const startBondTime = moment(times).isAfter(moment("2022-01-19T00:00:00.000Z"));

    if (!startBondTime) {
      return dispatch(error("Bond sale starts at 00:00 UTC 19th January"));
    } else {
      window.open("/#/app/dashboard", "_blank");
    }
  };
  const clickFunc = (url: String) => {
    // window.open(url);
  };
  useEffect(() => {
    // setHowTitleOneFade(true);
    const scrollEle = document.getElementById("root") || document.body;
    const handleScroll = (event: any) => {
      const scrollTop =
        (event.srcElement ? event.srcElement.scrollTop : false) ||
        window.pageYOffset ||
        (event.srcElement ? event.srcElement.scrollTop : 0);
      let clientHeight = document.documentElement.clientHeight;

      let wrapperHeight = document.getElementsByClassName("wrapper")[0].clientHeight;
      let bannerContentHeight = document.getElementsByClassName("banner-content")[0].clientHeight;

      let homeMigrate = document.getElementsByClassName("home-migrate")[0];
      let homeMigrateHeight = !homeMigrate ? 0 : homeMigrate.clientHeight;
      let infoElement = document.getElementsByClassName("info-element")[0];
      let infoElementHeight = !infoElement ? 0 : infoElement.clientHeight;

      let scrollHeight = document.documentElement.scrollHeight;
      if (scrollTop > bannerContentHeight - clientHeight) {
        setHowTitleOneFade(true);
      }
      if (homeMigrate && scrollTop > wrapperHeight - clientHeight) {
        setHowTitleTwoFade(true);
      }
      if (infoElement && scrollTop > wrapperHeight - clientHeight) {
        setHowTitleThreeFade(true);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", _.throttle(handleScroll, 100));
    };
  }, []);

  return (
    <div id="home" className="">
      <HomeHeader />
      <main className="wrapper">
        <div className="banner-content">
          <div className="banner-top">
            <img className="banner-coin-pic" src={coin} alt="" />
            <Typography variant="h1" component="h1" className="banner-title">
              <span className="text-animation-span">
                <i>The</i>&nbsp;
              </span>
              <span className="text-animation-span">
                <i>Decentralized</i>&nbsp;
              </span>
              <span className="text-animation-span">
                <i>Reserve</i>&nbsp;
              </span>
              <span className="text-animation-span">
                <i>Currency</i>
              </span>
            </Typography>
            <Typography variant="body1" component="p" className="banner-text text-animation-p">
              NoahArkDAO is building a community-owned decentralized financial infrastructure to bring more stability
              and transparency for the world.
            </Typography>
            <div className="banner-btn">
              <Button
                id="wallet-button"
                className="enter-app"
                variant="contained"
                color="primary"
                onClick={() => enterApp()}
              >
                Enter App
              </Button>
            </div>
          </div>
          <BannerBottom />
        </div>
        <div className="main-part">
          <CSSTransition in={howTitleOneFade} timeout={1000} classNames={"box"} unmountOnExit={true}>
            <HomeMigrate />
          </CSSTransition>
          <CSSTransition in={howTitleTwoFade} timeout={1000} classNames={"box"} unmountOnExit={true}>
            <DaoInformationElement howTitleTwoFade={howTitleTwoFade} />
          </CSSTransition>
          <CSSTransition in={howTitleThreeFade} timeout={1000} classNames={"box"} unmountOnExit={true}>
            <PartnerPart />
          </CSSTransition>
        </div>
      </main>
      <HomeFooter />
    </div>
  );
};
export default Home;
