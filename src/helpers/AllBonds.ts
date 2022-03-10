/*
 * @Author: jianwen.Wang
 * @Date: 2022-01-05 10:52:47
 * @LastEditTime: 2022-01-20 09:07:11
 * @LastEditors: jiawen.wang
 */
import { StableBond, LPBond, NetworkID, CustomBond, BondType } from "src/lib/Bond";
import { addresses } from "src/constants";

import { ReactComponent as DaiImg } from "src/assets/tokens/DAI.svg";
import { ReactComponent as NrkDaiImg } from "src/assets/tokens/NRK-DAI.svg";

import { abi as BondNrkDaiContract } from "src/abi/bonds/NrkDaiContract.json";

import { abi as DaiBondContract } from "src/abi/bonds/DaiContract.json";
import { abi as ReserveNrkDaiContract } from "src/abi/reserves/NrkDai.json";

// TODO(zx): Further modularize by splitting up reserveAssets into vendor token definitions
//   and include that in the definition of a bond
export const dai = new StableBond({
  name: "dai",
  displayName: "DAI.e",
  bondToken: "DAI",
  isAvailable: { [NetworkID.AVAXTestnet]: true, [NetworkID.AVAXNet]: true },
  bondIconSvg: DaiImg,
  bondContractABI: DaiBondContract,
  networkAddrs: {
    [NetworkID.AVAXTestnet]: {
      bondAddress: addresses[NetworkID.AVAXTestnet].DAI_BOND_ADDRESS,
      reserveAddress: addresses[NetworkID.AVAXTestnet].DAI_RESERVE_ADDRESS,
    },
    [NetworkID.AVAXNet]: {
      bondAddress: addresses[NetworkID.AVAXNet].DAI_BOND_ADDRESS,
      reserveAddress: addresses[NetworkID.AVAXNet].DAI_RESERVE_ADDRESS,
    },
  },
});

export const nrk_dai = new LPBond({
  name: "nrk_dai_lp",
  displayName: "NRK-DAI.e LP",
  bondToken: "DAI",
  isAvailable: { [NetworkID.AVAXTestnet]: true, [NetworkID.AVAXNet]: true },
  bondIconSvg: NrkDaiImg,
  bondContractABI: BondNrkDaiContract,
  reserveContract: ReserveNrkDaiContract,
  networkAddrs: {
    [NetworkID.AVAXTestnet]: {
      bondAddress: addresses[NetworkID.AVAXTestnet].NRK_DAI_BOND_ADDRESS,
      reserveAddress: addresses[NetworkID.AVAXTestnet].NRK_DAI_RESERVE_ADDRESS,
    },
    [NetworkID.AVAXNet]: {
      bondAddress: addresses[NetworkID.AVAXNet].NRK_DAI_BOND_ADDRESS,
      reserveAddress: addresses[NetworkID.AVAXNet].NRK_DAI_RESERVE_ADDRESS,
    },
  },
  // lpUrl: `https://app.sushi.com/add/${addresses[NetworkID.AVAXNet].DAI_RESERVE_ADDRESS}/${
  //   addresses[NetworkID.AVAXNet].NRK_ADDRESS
  // }`,
  lpUrl: `https://traderjoexyz.com/#/pool/${addresses[NetworkID.AVAXNet].NRK_ADDRESS}/${
    addresses[NetworkID.AVAXNet].DAI_ADDRESS
  }`,
});

// HOW TO ADD A NEW BOND:
// Is it a stableCoin bond? use `new StableBond`
// Is it an LP Bond? use `new LPBond`
// Add new bonds to this array!!
export const allBonds = [dai, nrk_dai];

// TODO (appleseed-expiredBonds): there may be a smarter way to refactor this
export const allExpiredBonds = [];
export const allBondsMap = allBonds.reduce((prevVal, bond) => {
  return { ...prevVal, [bond.name]: bond };
}, {});

// Debug Log
// console.log(allBondsMap);
export default allBonds;
