import "./home.scss";
import "./preSale.scss";
import React, { useEffect, useState, useCallback } from "react";
import { useAppSelector } from "../hooks";
import { allBondsMap } from "../helpers/AllBonds";
import { useDispatch, useSelector } from "react-redux";
import { trim } from "../helpers";
import SecondElement from "./SecondElement";
import HomeLinkList from "./HomeLinkList";
import Migrate from "./Migrate";
import PreSale from "./PreSale";
import ConnectMenu from "./ConnectMenu";
import moment from "moment";

import CSSTransition from "react-transition-group";
import { Skeleton } from "@material-ui/lab";
import { Button, Link } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

import { useWeb3Context } from "src/hooks/web3Context";
import { error } from "../slices/MessagesSlice";

function HomeContent() {
  const dispatch = useDispatch();
  const { connect, disconnect, connected, web3, chainID } = useWeb3Context();

  const useStyles = makeStyles(theme => ({
    appBar: {
      [theme.breakpoints.up("sm")]: {
        width: "100%",
        padding: "10px",
      },
      justifyContent: "flex-end",
      alignItems: "flex-end",
      background: "transparent",
      backdropFilter: "none",
      zIndex: 10,
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up("981")]: {
        display: "none",
      },
    },
  }));
  const elementData = [
    {
      title: "Bonds & LP fees",
      info: "Bond sales and LP Fees increase Treasury Revenue and lock in liquidity and help control NRK supply.",
      imgUrl: require("../assets/home/number-1.png"),
    },
    {
      title: "NoahArk Treasury",
      info: "Treasury inflow is used to increase Treasury Balance and back outstanding NRK tokens and regulate staking APY.",
      imgUrl: require("../assets/home/number-2.png"),
    },
    {
      title: "NRK Token",
      info: "Compounds yields automatically through a treasury backed currency with intrinsic value.",
      imgUrl: require("../assets/home/number-3.png"),
    },
  ];
  const bottomLogo = require("../assets/home/bottom-logo.png");
  const partnerGnosis = require("../assets/home/partner/partner-gnosis.png");
  const partnerBox = require("../assets/home/partner/partner-box.png");
  const partnerAvalanche = require("../assets/home/partner/partner-avalanche.png");
  const partnerOpenZeppe = require("../assets/home/partner/partner-openzepple.png");
  const sushi = require("../assets/home/partner/sushi.png");

  const [howTitleOneFade, setHowTitleOneFade] = useState(false);
  const [howTitleTwoFade, setHowTitleTwoFade] = useState(false);
  const [howTitleThreeFade, setHowTitleThreeFade] = useState(false);
  const times = moment().format();
  const isTime = moment(times).isAfter(moment("2022-01-16T23:59:59.000Z"));
  const treasuryBalance = useAppSelector(state => {
    if (state.bonding.loading == false) {
      let tokenBalances = 0;
      for (const bond in allBondsMap) {
        if (state.bonding[bond]) {
          tokenBalances += state.bonding[bond].purchased;
        }
      }
      return tokenBalances;
    }
  });
  const stakingAPY = useSelector(state => {
    return state.app.stakingAPY;
  });
  const trimmedStakingAPY = trim(Number(stakingAPY) * 100, 1);
  const stakingTVL = useAppSelector(state => {
    return state.app.stakingTVL;
  });
  const currentBlock = useAppSelector(state => {
    return state.app.currentBlock;
  });
  const startBondTime = moment(times).isAfter(moment("2022-01-19T00:00:00.000Z"));
  const enterApp = () => {
    if (!startBondTime) {
      return dispatch(error("Bond sale starts at 00:00 UTC 19th January"));
    } else {
      window.open("/#/app/dashboard", "_blank");
    }
  };
  useEffect(() => {
    const scrollEle = document.getElementById("full-content") || document.body;
    const handleScroll = event => {
      const scrollTop =
        (event.srcElement ? event.srcElement.scrollTop : false) ||
        window.pageYOffset ||
        (event.srcElement ? event.srcElement.scrollTop : 0);
      let clientHeight = document.documentElement.clientHeight;
      let scrollHeight = document.documentElement.scrollHeight;
      if (scrollTop > 150) {
        setHowTitleOneFade(true);
      }
      if (scrollTop > 400) {
        setHowTitleTwoFade(true);
      }
      if (scrollTop > 600) {
        setHowTitleThreeFade(true);
      }
      console.log("clientHeight", clientHeight, "scrollTop", scrollTop, "scrollHeight", scrollHeight);
    };
    scrollEle.addEventListener("scroll", handleScroll);
    return () => {
      scrollEle.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const clickFunc = url => {
    window.open(url);
  };
  return (
    <div className="full-content" id="full-content">
      <div className="home-content">
        <div className="nav-container">
          <a href="#" className="home-logo"></a>
          <div className="header-right">
            <HomeLinkList dark={"dark"}></HomeLinkList>
            <ConnectMenu />
          </div>
        </div>
        <div className="content">
          <div className="info">
            <div className="left">
              <div className="info-one">The Decentralized Reserve Currency</div>
              <div className="info-two">
                NoahArkDAO is building a community-owned decentralized financial infrastructure to bring more stability
                and transparency for the world.
              </div>
              <div className="info-three">
                {/* <Button
                  id="wallet-button"
                  // className={buttonStyles}
                  className="enter-app"
                  variant="contained"
                  color="primary"
                  size="large"
                  // onClick={clickFunc}
           
                >Coming Soon</Button> */}
                <Button
                  id="wallet-button"
                  // className={buttonStyles}
                  className="enter-app"
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={() => enterApp()}
                >
                  Enter App
                </Button>
              </div>
            </div>
            <div className="right">
              <div className="coin"></div>
            </div>
          </div>
        </div>
        <div className="noahark-info">
          <div className="noahark-info-content">
            <div className="info-item">
              <div className="key">Treasury Balance</div>
              <div className="value">
                {treasuryBalance ? (
                  <span>
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                      maximumFractionDigits: 0,
                      minimumFractionDigits: 0,
                    }).format(Number(treasuryBalance))}
                  </span>
                ) : (
                  <Skeleton variant="text" width={200}></Skeleton>
                )}
              </div>
            </div>
            <div className="info-item">
              <div className="key">Total Value Locked</div>
              <div className="value">
                {stakingTVL ? (
                  <span>
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                      maximumFractionDigits: 0,
                      minimumFractionDigits: 0,
                    }).format(stakingTVL)}
                  </span>
                ) : (
                  <Skeleton variant="text" width={200}></Skeleton>
                )}
              </div>
            </div>
            <div className="info-item">
              <div className="key">Current APY</div>
              <div className="value">
                {trimmedStakingAPY !== "NaN" ? (
                  <span>{new Intl.NumberFormat("en-US").format(Number(trimmedStakingAPY))}%</span>
                ) : (
                  <Skeleton variant="text" width={200}></Skeleton>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="how-content">
        <div className="content">
          {isTime ? (
            // <CSSTransition in={howTitleOneFade} timeout={300}  classNames={"how-title"} unmountOnExit>
            <div>
              <div className="how-title-one-box how-title-first-box">
                <div className="title">Migrate</div>
                <hr className="three-hr" />
              </div>
              <div className="migrate">
                <Migrate />
              </div>
            </div>
          ) : (
            // </CSSTransition>
            <div>
              <div className="how-title-one-box how-title-first-box">
                <div className="title">Pre-Sale</div>
                <hr className="three-hr" />
              </div>
              <div className="migrate">
                <PreSale />
              </div>
            </div>
          )}
          {/*<CSSTransition in={howTitleTwoFade} timeout={300}  classNames={"how-title"} unmountOnExit>*/}
          <div className="how-title-one-box">
            <div className="title">
              How does <span>NoahArkDAO</span> work ?
            </div>
            <hr className="one-hr" />
          </div>
          {/*</CSSTransition>*/}
          {/*<CSSTransition in={howTitleTwoFade} timeout={300}  classNames={"how-title"} unmountOnExit>*/}
          <div className="element">
            <SecondElement itemData={elementData} />
          </div>
          {/*</CSSTransition>*/}

          {/*<CSSTransition in={howTitleThreeFade} timeout={300}  classNames={"how-title"} unmountOnExit>*/}
          <div className="how-title-one-box">
            <div className="title">
              Our <span>Partners</span>
            </div>
            <hr className="two-hr" />
          </div>
          {/*</CSSTransition>*/}
          {/*<CSSTransition in={howTitleThreeFade} timeout={300}  classNames={"how-title"} unmountOnExit>*/}
          <div className="partners">
            <img src={partnerGnosis.default} alt="" />
            <img src={partnerBox.default} alt="" />
            {/* <img style={{width:'120px',height:'34px'}} src={sushi.default}  alt="" /> */}

            <img src={partnerAvalanche.default} alt="" />
            <img src={partnerOpenZeppe.default} alt="" />
          </div>
          {/*</CSSTransition>*/}
        </div>
      </div>
      <div className="bottom-content">
        <div className="content">
          <div className="top">
            <img className="left" src={bottomLogo.default} alt="" />
            <HomeLinkList className="right"></HomeLinkList>
          </div>
          <div className="bottom">
            <p>© Copyright 2022,NoahArkDAO.All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default HomeContent;
