import { Button, Typography, Box } from "@material-ui/core";
// import "./preSale.scss";
import React, { useEffect, useState, useCallback } from "react";
import { InputAdornment, OutlinedInput } from "@material-ui/core";
import { useAppSelector } from "../../../hooks";
import { useWeb3Context } from "src/hooks/web3Context";
import { t, Trans } from "@lingui/macro";
import ARNKIcon from "../../../assets/home/ARNK.png";
import NRKIcon from "../../../assets/new_home/NRK.png";
import arrowIcon from "../../../assets/new_home/arrow.png";
import { isPendingTxn, txnButtonText } from "../../../slices/PendingTxnsSlice";
import { migrateApprove, migratingAnrk } from "../../../slices/MigrateSlice";
import { useDispatch } from "react-redux";
import { error } from "../../../slices/MessagesSlice";
import { addresses, TOKEN_DECIMALS } from "../../../constants";
import NrkImg from "../../../assets/tokens/token_NRK.svg";
import ANRKImgSVG from "../../../assets/tokens/ANRK.svg";
import DAIImgSVG from "../../../assets/tokens/DAI.svg";
import { EnvHelper } from "../../../helpers/Environment";

import { IBuyAnrkAsyncThunk } from "../../../slices/interfaces";
import "../styles/homeMigrate.scss";
import moment from "moment";
const addTokenToWallet = (tokenSymbol: any, tokenAddress: any, address: any) => async () => {
  if (window.ethereum) {
    const host = window.location.origin;
    let tokenPath;
    let tokenDecimals = TOKEN_DECIMALS;
    switch (tokenSymbol) {
      case "DAI":
        tokenPath = DAIImgSVG;
        tokenDecimals = 18;
        break;
      case "NRK":
        tokenPath = NrkImg;
        break;
      case "aNRK":
        tokenPath = ANRKImgSVG;
        break;
      default:
        tokenPath = NrkImg;
    }
    const imageURL = `${host}/${tokenPath}`;

    try {
      await window.ethereum.request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20",
          options: {
            address: tokenAddress,
            symbol: tokenSymbol,
            decimals: tokenDecimals,
            image: imageURL,
          },
        },
      });
    } catch (error) {
      console.log(error);
    }
  }
};
function HomeMigrate() {
  const dispatch = useDispatch();
  const [nrkAmount, setNrkAmount] = useState("");
  const [anrkAmount, setAnrkAmount] = useState(0);

  const { provider, address, connected, connect, chainID, _switchNet, _addNet } = useWeb3Context();
  const anrkBalance = useAppSelector(state => {
    return state.account.balances && state.account.balances.anrk;
  });
  const anrkAllowance = useAppSelector(state => {
    return (state.account.trading && state.account.trading.anrkApprove) || 0;
  });
  const times = moment().format();
  const startMigrateTime = moment(times).isAfter(moment("2022-01-24T00:00:00.000Z"));
  const onMigrateAnrk = async (anrkAmount: number) => {
    if (!startMigrateTime) {
      return dispatch(error("Swap aNRK for NRK will be opened at 00:00 UTC 24th January"));
    }
    if (!provider) {
      dispatch(error("Please connect your wallet!"));
      return;
    }
    if (chainID !== parseInt(EnvHelper.getDefaultChainID())) {
      const switchNet = await _switchNet(EnvHelper.getDefaultChainID16()).catch((err: any) => {
        const addNet = _addNet(EnvHelper.getDefaultChainID16());
      });
    }
    if (anrkAmount > parseFloat(anrkBalance)) {
      return dispatch(error(`You don't have enough aNRK`));
    }
    let params = { amount: anrkAmount, provider, address, networkID: chainID, type: "" };
    await dispatch(migratingAnrk(params));
  };
  const onMigrateApprove = async () => {
    if (!startMigrateTime) {
      return dispatch(error("Swap aNRK for NRK will be opened at 00:00 UTC 24th January"));
    }
    if (!provider) {
      dispatch(error("Please connect your wallet!"));
      return;
    }
    if (chainID !== parseInt(EnvHelper.getDefaultChainID())) {
      const switchNet = await _switchNet(EnvHelper.getDefaultChainID16()).catch((err: any) => {
        const addNet = _addNet(EnvHelper.getDefaultChainID16());
      });
    }
    await dispatch(migrateApprove({ provider, address, networkID: chainID, token: "" }));
  };
  const pendingTransactions = useAppSelector(state => {
    return state.pendingTransactions;
  });
  const hasAllowance = useCallback(() => {
    return anrkAllowance > 0;
  }, [anrkAllowance]);
  const handleCoinInputChange = (e: any) => {
    let reg = new RegExp(/^\d*\.{0,1}\d*$/);
    if (reg.test(e)) {
      setNrkAmount(e);
      setAnrkAmount(e);
    }
  };
  return (
    <div className="home-migrate">
      <Typography variant="h2" component="h2" className="home-migrate-title">
        migrate
      </Typography>
      <div className="home-migrate-form">
        <div className="home-migrate-ipt">
          <OutlinedInput
            type="text"
            placeholder="Amount"
            className="migrate-input"
            value={anrkAmount}
            onChange={e => handleCoinInputChange(e.target.value)}
            labelWidth={0}
            endAdornment={
              <InputAdornment position="end">
                <Button
                  className="migrate-input-button"
                  variant="contained"
                  color="primary"
                  onClick={e => handleCoinInputChange(anrkBalance)}
                >
                  Max
                </Button>
              </InputAdornment>
            }
          />
          <div className="home-migrate-ipt-left">
            <img className="coin-icon" src={ARNKIcon} alt="" />
            <Typography
              variant="h3"
              component="h2"
              className="anrk-text"
              onClick={addTokenToWallet("aNRK", addresses[chainID].ANRK_ADDRESS, address)}
            >
              <span className="letter-lowercase">a</span>
              NRK
            </Typography>
          </div>
        </div>
        <div className="migrate-arr-img">
          <div className="img-box">
            <img src={arrowIcon} alt="" />
          </div>
        </div>
        <div className="home-migrate-ipt">
          <OutlinedInput
            type="number"
            placeholder="Amount"
            className="migrate-input"
            value={nrkAmount}
            onChange={e => handleCoinInputChange(e)}
            labelWidth={0}
          />
          <div className="home-migrate-ipt-left">
            <img className="coin-icon" src={NRKIcon} alt="" />
            <Typography
              variant="h3"
              component="h2"
              className="anrk-text"
              onClick={addTokenToWallet("NRK", addresses[chainID].NRK_ADDRESS, address)}
            >
              NRK
            </Typography>
          </div>
        </div>
        {address && hasAllowance() ? (
          <Button
            className="home-migrate-button"
            variant="contained"
            color="primary"
            disabled={isPendingTxn(pendingTransactions, "on_migrating")}
            onClick={() => {
              onMigrateAnrk(anrkAmount);
            }}
          >
            {txnButtonText(pendingTransactions, "on_migrating", `buy`)}
          </Button>
        ) : (
          <Button
            className="home-migrate-button"
            variant="contained"
            color="primary"
            disabled={isPendingTxn(pendingTransactions, "approve_migrate")}
            onClick={() => {
              onMigrateApprove();
            }}
          >
            {txnButtonText(pendingTransactions, "approve_migrate", `Approve`)}
          </Button>
        )}
      </div>
    </div>
  );
}

export default HomeMigrate;
