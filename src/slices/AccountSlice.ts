import { BigNumber, BigNumberish, ethers } from "ethers";
import { addresses } from "../constants";
import { abi as ierc20ABI, abi as ierc20Abi } from "../abi/IERC20.json";
import { abi as sNRKv2 } from "../abi/sNrkv2.json";

import { setAll } from "../helpers";

import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "src/store";
import { IBaseAddressAsyncThunk, ICalcUserBondDetailsAsyncThunk } from "./interfaces";
import { IERC20, SNrkv2 } from "src/typechain";

export interface IUserBalances {
  balances: {
    nrk: string;
    snrk: string;
    dai: string;
    anrk: string;
  };
}

export const getBalances = createAsyncThunk(
  "account/getBalances",
  async ({ address, networkID, provider }: IBaseAddressAsyncThunk) => {
    const nrkContract = new ethers.Contract(addresses[networkID].NRK_ADDRESS as string, ierc20Abi, provider) as IERC20;
    const nrkBalance = await nrkContract.balanceOf(address);
    const snrkContract = new ethers.Contract(
      addresses[networkID].SNRK_ADDRESS as string,
      ierc20Abi,
      provider,
    ) as IERC20;
    const snrkBalance = await snrkContract.balanceOf(address);
    const daiContract = new ethers.Contract(addresses[networkID].DAI_ADDRESS as string, ierc20Abi, provider) as IERC20;
    const daiBalance = await daiContract.balanceOf(address);
    const anrkContract = new ethers.Contract(addresses[networkID].ANRK_ADDRESS as string, ierc20Abi, provider) as IERC20;
    const anrkBalance = await anrkContract.balanceOf(address);
    return {
      balances: {
        nrk: ethers.utils.formatUnits(nrkBalance, "gwei"),
        snrk: ethers.utils.formatUnits(snrkBalance, "gwei"),
        dai: ethers.utils.formatUnits(daiBalance, "gwei"),
        anrk: ethers.utils.formatUnits(anrkBalance, "gwei"),
      },
    };
  },
);

interface IUserAccountDetails {
  staking: {
    nrkStake: number;
    nrkUnstake: number;
  };
}

export const loadAccountDetails = createAsyncThunk(
  "account/loadAccountDetails",
  async ({ networkID, provider, address }: IBaseAddressAsyncThunk, { dispatch }) => {
    console.log("address", address);
    console.log("networkID", networkID);
    const nrkContract = new ethers.Contract(addresses[networkID].NRK_ADDRESS as string, ierc20Abi, provider) as IERC20;
    const stakeAllowance = await nrkContract.allowance(address, addresses[networkID].STAKING_HELPER_ADDRESS);
    const snrkContract = new ethers.Contract(addresses[networkID].SNRK_ADDRESS as string, sNRKv2, provider) as SNrkv2;
    const unstakeAllowance = await snrkContract.allowance(address, addresses[networkID].STAKING_ADDRESS);
    const daiContract = new ethers.Contract(addresses[networkID].DAI_ADDRESS as string, ierc20ABI, provider) as IERC20;
    const daiAllowance = await daiContract.allowance(address, addresses[networkID].ANRK_SALE_ADDRESS);
    const anrkContract = new ethers.Contract(addresses[networkID].ANRK_ADDRESS as string, ierc20ABI, provider) as IERC20;
    const anrkAllowance = await anrkContract.allowance(address, addresses[networkID].ANRK_EXCHANGE_ADDRESS);
    // console.log("unwrapAllowance", unwrapAllowance);
    await dispatch(getBalances({ address, networkID, provider }));

    return {
      staking: {
        nrkStake: +stakeAllowance,
        nrkUnstake: +unstakeAllowance,
      },
      trading: {
        daiApprove: +daiAllowance,
        anrkApprove: +anrkAllowance,
      }
    };
  },
);

export interface IUserBondDetails {
  allowance: number;
  interestDue: number;
  bondMaturationBlock: number;
  pendingPayout: string; //Payout formatted in gwei.
}
export const calculateUserBondDetails = createAsyncThunk(
  "account/calculateUserBondDetails",
  async ({ address, bond, networkID, provider }: ICalcUserBondDetailsAsyncThunk) => {
    if (!address) {
      return {
        bond: "",
        displayName: "",
        bondIconSvg: "",
        isLP: false,
        allowance: 0,
        balance: "0",
        interestDue: 0,
        bondMaturationBlock: 0,
        pendingPayout: "",
      };
    }
    // dispatch(fetchBondInProgress());

    // Calculate bond details.
    const bondContract = bond.getContractForBond(networkID, provider);
    const reserveContract = bond.getContractForReserve(networkID, provider);

    let pendingPayout, bondMaturationBlock;
    const bondDetails = await bondContract.bondInfo(address);
    let interestDue: BigNumberish = Number(bondDetails.payout.toString()) / Math.pow(10, 9);
    bondMaturationBlock = +bondDetails.vesting + +bondDetails.lastBlock;
    pendingPayout = await bondContract.pendingPayoutFor(address);

    let allowance,
      balance = BigNumber.from(0);
    allowance = await reserveContract.allowance(address, bond.getAddressForBond(networkID));
    balance = await reserveContract.balanceOf(address);
    // formatEthers takes BigNumber => String
    const balanceVal = ethers.utils.formatEther(balance);
    // balanceVal should NOT be converted to a number. it loses decimal precision
    return {
      bond: bond.name,
      displayName: bond.displayName,
      bondIconSvg: bond.bondIconSvg,
      isLP: bond.isLP,
      allowance: Number(allowance.toString()),
      balance: balanceVal,
      interestDue,
      bondMaturationBlock,
      pendingPayout: ethers.utils.formatUnits(pendingPayout, "gwei"),
    };
  },
);

export interface IAccountSlice extends IUserAccountDetails, IUserBalances {
  bonds: { [key: string]: IUserBondDetails };
  balances: {
    nrk: string;
    snrk: string;
    dai: string;
    anrk: string;
  };
  loading: boolean;
  staking: {
    nrkStake: number;
    nrkUnstake: number;
  };
  trading: {
    daiApprove: number;
    mimApprove: number;
    usdcApprove: number;
    anrkApprove: number;
  };
}

const initialState: IAccountSlice = {
  loading: false,
  bonds: {},
  balances: { nrk: "", snrk: "", dai: "" , anrk: ""},
  staking: { nrkStake: 0, nrkUnstake: 0 },
  trading: { daiApprove: 0, mimApprove: 0 , usdcApprove: 0 , anrkApprove: 0 },
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    fetchAccountSuccess(state, action) {
      setAll(state, action.payload);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loadAccountDetails.pending, state => {
        state.loading = true;
      })
      .addCase(loadAccountDetails.fulfilled, (state, action) => {
        setAll(state, action.payload);
        state.loading = false;
      })
      .addCase(loadAccountDetails.rejected, (state, { error }) => {
        state.loading = false;
        console.log(error);
      })
      .addCase(getBalances.pending, state => {
        state.loading = true;
      })
      .addCase(getBalances.fulfilled, (state, action) => {
        setAll(state, action.payload);
        state.loading = false;
      })
      .addCase(getBalances.rejected, (state, { error }) => {
        state.loading = false;
        console.log(error);
      })
      .addCase(calculateUserBondDetails.pending, state => {
        state.loading = true;
      })
      .addCase(calculateUserBondDetails.fulfilled, (state, action) => {
        if (!action.payload) return;
        const bond = action.payload.bond;
        state.bonds[bond] = action.payload;
        state.loading = false;
      })
      .addCase(calculateUserBondDetails.rejected, (state, { error }) => {
        state.loading = false;
        console.log(error);
      });
  },
});

export default accountSlice.reducer;

export const { fetchAccountSuccess } = accountSlice.actions;

const baseInfo = (state: RootState) => state.account;

export const getAccountState = createSelector(baseInfo, account => account);
