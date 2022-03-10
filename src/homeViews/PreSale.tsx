import React, { useCallback, useState } from "react";
import { OutlinedInput, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useWeb3Context } from "src/hooks/web3Context";
import { t, Trans } from "@lingui/macro";
import DAIIcon from "../assets/home/DAI.png";
import ARNKIcon from "../assets/home/ARNK.png";
import { useAppSelector } from "../hooks";
import { error } from "../slices/MessagesSlice";
import { tradingAnrk, tradingApprove } from "../slices/TradingAnrkSlice";
import { useDispatch } from "react-redux";
import { isPendingTxn, txnButtonText } from "../slices/PendingTxnsSlice";
import arrowIcon from "../assets/home/arrow.png";
import { addresses, TOKEN_DECIMALS } from "../constants";
import DaiImg from "../assets/tokens/DAI.svg";
import NrkImg from "../assets/tokens/token_NRK.svg";
import ANrkImg from "../assets/tokens/ANRK.svg";
import moment from "moment";
import { EnvHelper } from "../helpers/Environment";
const addTokenToWallet = (tokenSymbol: string, tokenAddress: string, address: string) => async () => {
  if (window.ethereum) {
    const host = window.location.origin;
    let tokenPath;
    let tokenDecimals = TOKEN_DECIMALS;
    switch (tokenSymbol) {
      case "DAI":
        tokenPath = DaiImg;
        tokenDecimals = 18;
        break;
      case "NRK":
        tokenPath = NrkImg;
        break;
      case "aNRK":
        tokenPath = ANrkImg;
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
const PreSale = () => {
  const dispatch = useDispatch();
  const { provider, address, connected, connect, chainID, _switchNet, _addNet } = useWeb3Context();
  const daiBalance = useAppSelector(state => {
    return state.account.balances && state.account.balances.dai;
  });
  const daiAllowance = useAppSelector(state => {
    return (state.account.trading && state.account.trading.daiApprove) || 0;
  });
  const pendingTransactions = useAppSelector(state => {
    return state.pendingTransactions;
  });
  const [coinAmount, setCoinAmount] = useState(500);
  const [coinType, setCoinType] = useState("dai");
  const [anrkAmount, setAnrkAmount] = useState(125);
  const handleAnrkInputChange = (a: string) => {
    if (parseInt(a) < 0) {
      setAnrkAmount(0);
      setCoinAmount(0);
    } else {
      if (parseInt(a) > 1000000) {
        setAnrkAmount(1000000);
        setCoinAmount(1000000 * 4);
      } else {
        setAnrkAmount(parseInt(a));
        setCoinAmount(parseInt(a) * 4);
      }
    }
  };
  const handleCoinInputChange = (a: string) => {
    if (parseInt(a) < 0) {
      setAnrkAmount(0);
      setCoinAmount(0);
    } else {
      if (parseInt(a) > 1000000) {
        setAnrkAmount(1000000 / 4);
        setCoinAmount(1000000);
      } else {
        setAnrkAmount(parseInt(a) / 4);
        setCoinAmount(parseInt(a));
      }
    }
  };
  const handleChange = (event: any) => {
    const {
      target: { value },
    } = event;
    setCoinType(value);
  };

  const times = moment().format()
  const persaleApproveTime = moment(times).isAfter(moment("2022-01-14T00:00:00.000Z"))
  const onTradingAnrk = async (amount: number) => {
    if (!persaleApproveTime){
      dispatch(error("Pre-sale begins at 00:00 UTC 14th January and ends at 23:59 UTC 16th January"));
      return ;
    }
    if (!provider) {
      dispatch(error("Please connect your wallet!"));
      return;
    }
    if (chainID !== parseInt(EnvHelper.getDefaultChainID() as string)) {
      const switchNet = await _switchNet(EnvHelper.getDefaultChainID16()).catch((err : any) => {
        const addNet = _addNet(EnvHelper.getDefaultChainID16());
      });
    }
    if (!amount) {
      dispatch(error("Input error"));
      return;
    }
    if (coinType === "dai") {
      if (amount > parseFloat(daiBalance)) {
        return dispatch(error(t`You don't have enough DAI.e`));
      }
    }
    await dispatch(tradingAnrk({ type: coinType, amount, address, provider, networkID: chainID }));
  };
  const onTradingApprove = async () => {
    if (!persaleApproveTime){
      dispatch(error("Pre-sale begins at 00:00 UTC 14th January and ends at 23:59 UTC 16th January"));
      return
    }
    if (!provider) {
      dispatch(error("Please connect your wallet!"));
      return;
    }
    if (chainID !== parseInt(EnvHelper.getDefaultChainID() as string)) {
      const switchNet = await _switchNet(EnvHelper.getDefaultChainID16()).catch((err : any) => {
        const addNet = _addNet(EnvHelper.getDefaultChainID16());
      });
    }
    await dispatch(tradingApprove({ token: coinType, provider, address, networkID: chainID }));
  };
  const hasAllowance = useCallback(
    token => {
      if (token === "dai") return daiAllowance > 0;
      return 0;
    },
    [daiAllowance],
  );
  return (
    <div className="migrate-nrk-card">
      <div className="pre-sale-content" style={{ padding: "50px 0 0" }}>
        {/* <div className="pre-sale-title">Purchase quantity</div> */}

        <div className="corresponding-price">
          <OutlinedInput
            type="number"
            placeholder="Amount"
            className="pre-sale-input1"
            value={coinAmount}
            disabled={false}
            onChange={e => handleCoinInputChange(e.target.value)}
          />
          <div className="purchase-quantity-left">
            <img className="coin-icon" src={DAIIcon} alt="" />
            <span className="anrk-text" onClick={addTokenToWallet("DAI", addresses[chainID].DAI_ADDRESS, address)}>
              DAI.e
            </span>
          </div>
        </div>
        <div className="migrate-arr-img" style={{ padding: "20px 0px 20px" }}>
          <img src={arrowIcon} alt="" />
        </div>
        <div className="purchase-quantity">
          <OutlinedInput
            type="number"
            placeholder="Amount"
            className="pre-sale-input1"
            value={anrkAmount}
            // disableUnderline={false}
            onChange={e => handleAnrkInputChange(e.target.value)}
          />
          <div className="purchase-quantity-left">
            <img className="coin-icon" src={ARNKIcon} alt="" />
            <span className="anrk-text" onClick={addTokenToWallet("aNRK", addresses[chainID].ANRK_ADDRESS, address)}>
              aNRK
            </span>
          </div>
        </div>
        {/* <div className="pre-sale-title">Corresponding price</div> */}

        {address && hasAllowance(coinType) ? (
          <Button
            className="pre-sale-button"
            disabled={isPendingTxn(pendingTransactions, "on_trading")}
            onClick={() => {
              onTradingAnrk(anrkAmount);
            }}
          >
            {txnButtonText(pendingTransactions, "on_trading", t`buy`)}
          </Button>
        ) : (
          <Button
            className="pre-sale-button"
            disabled={isPendingTxn(pendingTransactions, "approve_trading")}
            onClick={() => {
              onTradingApprove();
            }}
          >
            {txnButtonText(pendingTransactions, "approve_trading", t`Approve`)}
          </Button>
        )}
      </div>
    </div>
  );
};

export default PreSale;
