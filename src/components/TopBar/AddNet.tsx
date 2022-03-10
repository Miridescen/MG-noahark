import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Box, Button, SvgIcon, Typography, Popper, Paper, Divider, Link, Slide, Fade } from "@material-ui/core";
import { Trans } from "@lingui/macro";
import { useWeb3Context } from "src/hooks/web3Context";
import { IReduxState } from "src/slices/state.interface";
import { EnvHelper } from "../../helpers/Environment";

function addNet({ theme }: { theme: any }) {
  const { connect, disconnect, connected, chainID, _switchNet, _addNet , currentChainID} = useWeb3Context();
  let buttonText = <Trans>Switch to AVAX</Trans>;
  const buttonStyles = "pending-txn-container";
  const clickFunc = async () => {
    const switchNet = await _switchNet(EnvHelper.getDefaultChainID16()).catch(() => {
      const addNet = _addNet(EnvHelper.getDefaultChainID16());
    });
  };
  const defaultChainID = EnvHelper.getDefaultChainID() as string
  return (
    <div
      className="wallet-menu"
      id="wallet-menu"
    >
      {currentChainID !== parseInt(defaultChainID) && connected == true && (
        <Button
          id="wallet-button"
          className={buttonStyles}
          variant="contained"
          color="secondary"
          size="large"
          onClick={clickFunc}
          key={1}
        >
          {buttonText}
        </Button>
      )}
    </div>
  );
}
export default addNet;
