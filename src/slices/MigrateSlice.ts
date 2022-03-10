import { IBuyAnrkAsyncThunk, IJsonRPCError, IChangeApprovalAsyncThunk } from "./interfaces";

import { createAsyncThunk } from "@reduxjs/toolkit";
import { ethers, BigNumber } from "ethers";
import { addresses } from "../constants";
import { IERC20, MigrateContract } from "../typechain";
import { error, info } from "./MessagesSlice";
import { abi as ierc20Abi, abi as ierc20ABI } from "../abi/IERC20.json";
import { fetchAccountSuccess, getBalances } from "./AccountSlice";
import { clearPendingTxn, fetchPendingTxns } from "./PendingTxnsSlice";
import { abi as MigrateABI } from "../abi/preSaleAndMigrate/MigrateContract.json";

function alreadyApprovedToken(anrkAllowance: BigNumber) {
  // set defaults
  let bigZero = BigNumber.from("0");
  let applicableAllowance = bigZero;
  // determine which allowance to check
  applicableAllowance = anrkAllowance;
  // check if allowance exists
  if (applicableAllowance.gt(bigZero)) return true;

  return false;
}

export const migrateApprove = createAsyncThunk(
  "migrate/migrateApprove",
  async ({ provider, address, networkID }: IChangeApprovalAsyncThunk, { dispatch }) => {
    if (!provider) {
      dispatch(error("Please connect your wallet!"));
      return;
    }
    const signer = provider.getSigner();

    const anrkContract = new ethers.Contract(addresses[networkID].ANRK_ADDRESS as string, ierc20ABI, signer) as IERC20;
    let approveTx;
    let anrkAllowance = await anrkContract.allowance(address, addresses[networkID].ANRK_EXCHANGE_ADDRESS);

    // return early if approval has already happened
    if (alreadyApprovedToken(anrkAllowance)) {
      dispatch(info("Approval completed."));
      return dispatch(
        fetchAccountSuccess({
          trading: { anrkApprove: +anrkAllowance },
        }),
      );
    }
    try {
      approveTx = await anrkContract.approve(
        addresses[networkID].ANRK_EXCHANGE_ADDRESS,
        ethers.utils.parseUnits("1000000000000000000000000000", "gwei").toString(),
      );
      const text = "Approve";
      const pendingTxnType = "approve_migrate";
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
    anrkAllowance = await anrkContract.allowance(address, addresses[networkID].ANRK_EXCHANGE_ADDRESS);
    return dispatch(
      fetchAccountSuccess({
        trading: { anrkApprove: +anrkAllowance },
      }),
    );
  },
);

export const migratingAnrk = createAsyncThunk(
  "trading/migratingAnrk",
  async ({ amount, provider, address, networkID }: IBuyAnrkAsyncThunk, { dispatch }) => {
    if (!provider) {
      dispatch(error("Please connect your wallet!"));
      return;
    }
    const signer = provider.getSigner();
    const migratingContract = new ethers.Contract(
      addresses[networkID].ANRK_EXCHANGE_ADDRESS as string,
      MigrateABI,
      signer,
    ) as MigrateContract;
    if (amount <= 0) {
      dispatch(error("Please enter purchase quantity greater than 1"));
      return;
    }
    let migratingTx;
    try {
      const pendingTxnType = "on_migrating";
      migratingTx = await migratingContract.migrate(amount * Math.pow(10, 9));
      dispatch(fetchPendingTxns({ txnHash: migratingTx.hash, text: "Migrating", type: pendingTxnType }));
      await migratingTx.wait();
      const daiContract = new ethers.Contract(
        addresses[networkID].DAI_ADDRESS as string,
        ierc20Abi,
        provider,
      ) as IERC20;
      const daiBalance = await daiContract.balanceOf(address);
      const anrkContract = new ethers.Contract(
        addresses[networkID].ANRK_ADDRESS as string,
        ierc20Abi,
        provider,
      ) as IERC20;
      const anrkBalance = await anrkContract.balanceOf(address);
      return dispatch(
        fetchAccountSuccess({
          balances: {
            dai: ethers.utils.formatUnits(daiBalance, "gwei"),
            anrk: ethers.utils.formatUnits(anrkBalance, "gwei"),
          },
        }),
      );
    } catch (e: unknown) {
      const rpcError = e as IJsonRPCError;
      dispatch(error(rpcError.data.message));
      return;
    } finally {
      if (migratingTx) {
        dispatch(clearPendingTxn(migratingTx.hash));
      }
    }
    dispatch(getBalances({ address, networkID, provider }));
  },
);
