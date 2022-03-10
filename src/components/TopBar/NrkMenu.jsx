import { useState, useEffect } from "react";
import { addresses, TOKEN_DECIMALS } from "../../constants";
import { NavLink } from "react-router-dom";
import { Link, SvgIcon, Popper, Button, Paper, Typography, Divider, Box, Fade, Slide } from "@material-ui/core";
import { ReactComponent as InfoIcon } from "../../assets/icons/info-fill.svg";
import { ReactComponent as ArrowUpIcon } from "../../assets/icons/arrow-up.svg";
import { ReactComponent as nrkTokenImg } from "../../assets/tokens/token_NRK.svg";
import { ReactComponent as nrkWhiteTokenImg } from "../../assets/tokens/token_NRK_white.svg";

import "./nrkmenu.scss";
import { dai } from "src/helpers/AllBonds";
import { Trans } from "@lingui/macro";
import { useWeb3Context } from "../../hooks/web3Context";

import NrkImg from "src/assets/tokens/token_NRK_white.svg";
import sNrkImg from "src/assets/tokens/token_NRK.svg";

import { useSelector } from "react-redux";

const addTokenToWallet = (tokenSymbol, tokenAddress, address) => async () => {
  if (window.ethereum) {
    const host = window.location.origin;
    let tokenPath;
    let tokenDecimals = TOKEN_DECIMALS;
    switch (tokenSymbol) {
      case "NRK":
        tokenPath = NrkImg;
        break;
      case "sNRK":
        tokenPath = sNrkImg;
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

function NrkMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const isEthereumAPIAvailable = window.ethereum;
  const { chainID, address } = useWeb3Context();
  const [nrkBtnHover, setNrkBtnHover] = useState(false);
  const [snrkBtnHover, setSNrkBtnHover] = useState(false);
  const networkID = chainID;
  const theme = window.localStorage.getItem("theme");
  const SNRK_ADDRESS = addresses[networkID].SNRK_ADDRESS;
  const NRK_ADDRESS = addresses[networkID].NRK_ADDRESS;
  const DAI_ADDRESS = addresses[networkID].DAI_ADDRESS;
  const handleClick = event => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };
  const currentBlock = useSelector(state => {
    return state.app.currentBlock;
  });
  const open = Boolean(anchorEl);
  const id = "ohm-popper";
  const daiAddress = dai.getAddressForReserve(networkID);
  // const fraxAddress = frax.getAddressForReserve(networkID);
  return (
    <Box
      component="div"
      onMouseEnter={e => handleClick(e)}
      onMouseLeave={e => handleClick(e)}
      id="ohm-menu-button-hover"
    >
      <Button id="ohm-menu-button" size="large" variant="contained" color="secondary" title="NRK" aria-describedby={id}>
        <SvgIcon component={InfoIcon} color="primary" />
        <Typography>NRK</Typography>
      </Button>

      <Popper id={id} open={open} anchorEl={anchorEl} placement="bottom-start" transition>
        {({ TransitionProps }) => {
          return (
            <Fade {...TransitionProps} timeout={100}>
              <Paper className={`ohm-menu ${theme === "dark" ? "theme-dark" : "theme-dark"}`} elevation={1}>
                {/* <Box component="div" className="buy-tokens">
                  <Link
                    href={`https://avalanche.sushi.com/swap?inputCurrency=${NRK_ADDRESS}&outputCurrency=${DAI_RESERVE_ADDRESS}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Button size="large" variant="contained" color="secondary" fullWidth>
                      <Typography align="left">
                        <Trans>Buy on Sushi</Trans>
                        <SvgIcon component={ArrowUpIcon} htmlColor="#A3A3A3" />
                      </Typography>
                    </Button>
                  </Link>
                </Box> */}
                <Box component="div" className="buy-tokens">
                  <Link
                    href={`https://traderjoexyz.com/#/trade?outputCurrency=${NRK_ADDRESS}&inputCurrency=${DAI_ADDRESS}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Button size="large" variant="contained" color="secondary" fullWidth>
                      <Typography align="left">
                        <Trans>Buy on traderjoexyz</Trans>
                        <SvgIcon component={ArrowUpIcon} htmlColor="#A3A3A3" />
                      </Typography>
                    </Button>
                  </Link>
                </Box>

                {isEthereumAPIAvailable ? (
                  <Box className="add-tokens">
                    <Divider color="secondary" />
                    <p>
                      <Trans>ADD TOKEN TO WALLET</Trans>
                    </p>
                    <Box display="flex" flexDirection="row" justifyContent="space-between">
                      {NRK_ADDRESS && (
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={addTokenToWallet("NRK", NRK_ADDRESS, address)}
                          onMouseOver={() => setNrkBtnHover(true)}
                          onMouseOut={() => setNrkBtnHover(false)}
                        >
                          <SvgIcon
                            component={nrkBtnHover === false ? nrkTokenImg : nrkWhiteTokenImg}
                            viewBox="0 0 100 100"
                            style={{ height: "25px", width: "25px" }}
                          />
                          <Typography variant="body1">NRK</Typography>
                        </Button>
                      )}
                      {SNRK_ADDRESS && (
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={addTokenToWallet("sNRK", SNRK_ADDRESS, address)}
                          onMouseOver={() => setSNrkBtnHover(true)}
                          onMouseOut={() => setSNrkBtnHover(false)}
                        >
                          <SvgIcon
                            component={snrkBtnHover === false ? nrkTokenImg : nrkWhiteTokenImg}
                            viewBox="0 0 100 100"
                            style={{ height: "25px", width: "25px" }}
                          />
                          <Typography variant="body1">sNRK</Typography>
                        </Button>
                      )}
                    </Box>
                  </Box>
                ) : null}
              </Paper>
            </Fade>
          );
        }}
      </Popper>
    </Box>
  );
}

export default NrkMenu;
