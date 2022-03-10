/*
 * @Author: jianwen.Wang
 * @Date: 2022-01-20 11:19:21
 * @LastEditTime: 2022-01-22 09:22:06
 * @LastEditors: jiawen.wang
 */
import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Typography } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";

import { useAppSelector } from "../../../hooks";
import { allBondsMap } from "../../../helpers/AllBonds";
import { trim } from "../../../helpers";
import { useWeb3Context } from "../../../hooks/web3Context";

import { IReduxState } from "../../../slices/state.interface";

import "../styles/homeBottom.scss";

function BannerBottom() {
  const dispatch = useDispatch();
  const { connect, disconnect, connected, chainID } = useWeb3Context();
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
  const stakingAPY = useSelector((state: IReduxState) => {
    return state.app.stakingAPY;
  });
  const trimmedStakingAPY = trim(Number(stakingAPY) * 100, 1);
  const stakingTVL = useAppSelector(state => {
    return state.app.stakingTVL;
  });

  return (
    <div className="noahark-info">
      <div className="info-item">
        <Typography variant="body1" component="span" className="banner-title key">
          Treasury Balance
        </Typography>
        <Typography variant="h2" component="h2" className="banner-title value">
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
        </Typography>
      </div>
      <div className="info-item">
        <Typography variant="body1" component="span" className="banner-title key">
          Total Value Locked
        </Typography>
        <Typography variant="h2" component="h2" className="banner-title value">
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
        </Typography>
      </div>
      <div className="info-item">
        <Typography variant="body1" component="span" className="banner-title key">
          Current APY
        </Typography>
        <Typography variant="h2" component="h2" className="banner-title value">
          <div className="value">
            {trimmedStakingAPY !== "NaN" ? (
              <span>{new Intl.NumberFormat("en-US").format(Number(trimmedStakingAPY))}%</span>
            ) : (
              <Skeleton variant="text" width={200}></Skeleton>
            )}
          </div>
        </Typography>
      </div>
    </div>
  );
}
export default BannerBottom;
