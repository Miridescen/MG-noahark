import { createAsyncThunk } from "@reduxjs/toolkit";
import { IBuyAnrkAsyncThunk, IJsonRPCError, IChangeApprovalAsyncThunk } from "./interfaces";
import { error, info } from "./MessagesSlice";
import { ethers } from "ethers";
import { addresses } from "../constants";
import { abi as AnrkSaleABI } from "../abi/preSaleAndMigrate/AnrkSaleContract.json";
import { IERC20, AnrkSaleContract } from "../typechain";
import { clearPendingTxn, fetchPendingTxns } from "./PendingTxnsSlice";
import {
  BigNumber,
} from "ethers";
import { abi as ierc20ABI } from "../abi/IERC20.json";
import { fetchAccountSuccess, getBalances } from "./AccountSlice";
interface IUAData {
  address: string;
  value: string;
  txHash: string | null;
  type: string | null;
}
function alreadyApprovedToken(
  token: string,
  daiAllowance: BigNumber,
) {
  // set defaults
  let bigZero = BigNumber.from("0");
  let applicableAllowance = bigZero;

  // determine which allowance to check
  if (token === "dai") {
    applicableAllowance = daiAllowance;
  }

  // check if allowance exists
  if (applicableAllowance.gt(bigZero)) return true;

  return false;
}
export const tradingApprove = createAsyncThunk(
  "trading/tradingApprove",
  async ({ token, provider, address, networkID }: IChangeApprovalAsyncThunk, { dispatch }) => {
    if (!provider) {
      dispatch(error("Please connect your wallet!"));
      return;
    }
    const signer = provider.getSigner();
    const daiContract = new ethers.Contract(addresses[networkID].DAI_ADDRESS as string, ierc20ABI, signer) as IERC20;
    let approveTx;
    let daiAllowance = await daiContract.allowance(address, addresses[networkID].ANRK_SALE_ADDRESS);
    const tradingContract = new ethers.Contract(
      addresses[networkID].ANRK_SALE_ADDRESS as string,
      AnrkSaleABI,
      signer,
    ) as AnrkSaleContract;
    let isApproveBuyer = await tradingContract.approvedBuyers([address].toString());
    if (isApproveBuyer) {
      if (alreadyApprovedToken(token, daiAllowance)) {
        dispatch(info("Approval completed."));
        return dispatch(
          fetchAccountSuccess({
            trading: { daiApprove: +daiAllowance },
          }),
        );
      }
      try {
        if (token === "dai") {
          // won't run if stakeAllowance > 0
          approveTx = await daiContract.approve(
            addresses[networkID].ANRK_SALE_ADDRESS,
            ethers.utils.parseUnits("1000000000000000000000000000", "gwei").toString(),
          );
        }
        const text = "Approve";
        const pendingTxnType = "approve_trading";
        if (approveTx) {
          dispatch(fetchPendingTxns({ txnHash: approveTx.hash, text, type: pendingTxnType }));
          await approveTx.wait();
        }
      } catch (e: unknown) {
        dispatch(error((e as IJsonRPCError).data.message));
        return;
      } finally {
        if (approveTx) {
          dispatch(clearPendingTxn(approveTx.hash));
        }
      }

      // go get fresh allowances
      daiAllowance = await daiContract.allowance(address, addresses[networkID].ANRK_SALE_ADDRESS);
      return dispatch(
        fetchAccountSuccess({
          trading: { daiApprove: +daiAllowance },
        }),
      );
    } else {
      dispatch(error("Not in the whitelist"));
      return;
    }
  },
);
export const tradingAnrk = createAsyncThunk(
  "trading/tradingAnrk",
  async ({ type, amount, provider, address, networkID }: IBuyAnrkAsyncThunk, { dispatch }) => {
    if (!provider) {
      dispatch(error("Please connect your wallet!"));
      return;
    }
    const signer = provider.getSigner();
    const tradingContract = new ethers.Contract(
      addresses[networkID].ANRK_SALE_ADDRESS as string,
      AnrkSaleABI,
      signer,
    ) as AnrkSaleContract;
    let isApproveBuyer = await tradingContract.approvedBuyers([address].toString());
    if (isApproveBuyer) {
      if (amount <= 0) {
        dispatch(error("Please enter purchase quantity greater than 1"));
        return;
      }
      let tradingTx;
      try {
        let coin_address;
        if (type === "dai") {
          coin_address = addresses[networkID].DAI_ADDRESS;
        }
        const pendingTxnType = "on_trading";
        tradingTx = await tradingContract.buyAlphaNRK(coin_address as string, amount * Math.pow(10, 9));
        dispatch(fetchPendingTxns({ txnHash: tradingTx.hash, text: "Trading", type: pendingTxnType }));
        await tradingTx.wait();
      } catch (e: unknown) {
        const rpcError = e as IJsonRPCError;
        dispatch(error(rpcError.data.message));
        return;
      } finally {
        if (tradingTx) {
          dispatch(clearPendingTxn(tradingTx.hash));
        }
      }
      dispatch(getBalances({ address, networkID, provider }));
    } else {
      dispatch(error("Not in the whitelist"));
      return;
    }
  },
);
