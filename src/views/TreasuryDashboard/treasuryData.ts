// TODO: add paramaterization
export const treasuryDataQuery = `
query {
  protocolMetrics(first: 100, orderBy: timestamp, orderDirection: desc) {
    runway100k
    runway10k
    runway20k
    runway2dot5k
    runway50k
    runway5k
    runway70k
    runway7dot5k
    nrkPrice
    nrkCirculatingSupply
    nextEpochRebase
    nextDistributedNrk
    marketCap
    id
    currentAPY
    runwayCurrent
    sNrkCirculatingSupply
    timestamp
    totalSupply
    totalValueLocked
    treasuryDaiMarketValue
    treasuryDaiRiskFreeValue
    treasuryMarketValue
    treasuryNrkDaiPOL
    treasuryRiskFreeValue
  }
}
`;

export const rebasesDataQuery = `
query {
  rebases(where: {contract: "0xe830a08D4A794DEDB03A0B46cA7BBC8468ADc47B"}, orderBy: timestamp, first: 1000, orderDirection: desc) {
    percentage
    timestamp
  }
}
`;

// export default treasuryData;
export const bulletpoints = {
  tvl: [
    {
      right: 20,
      top: -12,
      background: "linear-gradient(180deg, #768299 -10%, #98B3E9 100%)",
    },
  ],
  coin: [
    {
      right: 15,
      top: -12,
      background: "linear-gradient(180deg, #F5AC37 -10%, #EA9276 100%)",
    },
    {
      right: 25,
      top: -12,
      background: "linear-gradient(180deg, #768299 -10%, #98B3E9 100%)",
    },
    {
      right: 29,
      top: -12,
      background: "linear-gradient(180deg, #DC30EB -10%, #EA98F1 100%)",
    },
    {
      right: 29,
      top: -12,
      background: "linear-gradient(180deg, #4C8C2A -10%, #8BFF4D 100%)",
    },
    {
      right: 29,
      top: -12,
      background: "linear-gradient(180deg, #c9184a -10%, #ff758f 100%)",
    },
  ],
  rfv: [
    {
      right: 15,
      top: -12,
      background: "linear-gradient(180deg, #F5AC37 -10%, #EA9276 100%)",
    },
    {
      right: 25,
      top: -12,
      background: "linear-gradient(180deg, #768299 -10%, #98B3E9 100%)",
    },
    {
      right: 29,
      top: -12,
      background: "linear-gradient(180deg, #c9184a -10%, #ff758f 100%)",
    },
  ],
  holder: [
    {
      right: 40,
      top: -12,
      background: "#A3A3A3",
    },
  ],
  apy: [
    {
      right: 20,
      top: -12,
      background: "#49A1F2",
    },
  ],
  runway: [
    {
      right: 45,
      top: -12,
      background: "#000000",
    },
    {
      right: 48,
      top: -12,
      background: "#2EC608",
    },
    {
      right: 48,
      top: -12,
      background: "#49A1F2",
    },
    {
      right: 48,
      top: -12,
      background: "#c9184a",
    },
  ],
  staked: [
    {
      right: 45,
      top: -11,
      background: "linear-gradient(180deg, #55EBC7 -10%, rgba(71, 172, 235, 0) 100%)",
    },
    {
      right: 68,
      top: -12,
      background: "rgba(151, 196, 224, 0.2)",
      border: "1px solid rgba(54, 56, 64, 0.5)",
    },
  ],
  pol: [
    {
      right: 15,
      top: -12,
      background: "linear-gradient(180deg, rgba(56, 223, 63, 1) -10%, rgba(182, 233, 152, 1) 100%)",
    },
    {
      right: 25,
      top: -12,
      background: "rgba(219, 242, 170, 1)",
      border: "1px solid rgba(118, 130, 153, 1)",
    },
  ],
};

export const tooltipItems = {
  tvl: ["Total Value Deposited"],
  coin: ["DAI.e"],
  rfv: ["DAI.e"],
  holder: ["NRKies"],
  apy: ["APY"],
  runway: ["Current", "7.5K APY", "5K APY", "2.5K APY"],
  pol: ["LP Treasury", "Market LP"],
};

export const tooltipInfoMessages = {
  tvl: "Total Value Deposited, is the dollar amount of all NRK staked in the protocol. This metric is often used as growth or health indicator in DeFi projects.",
  mvt: "Market Value of Treasury Assets, is the sum of the value (in dollars) of all assets held by the treasury.",
  rfv: "Risk Free Value, is the amount of funds the treasury guarantees to use for backing NRK.",
  pol: "Protocol Owned Liquidity, is the amount of LP the treasury owns and controls. The more POL the better for the protocol and its users.",
  holder: "Holders, represents the total number of Nrkies (sNRK holders)",
  staked: "NRK Staked, is the ratio of sNRK to NRK (staked vs unstaked)",
  apy: "Annual Percentage Yield, is the normalized representation of an interest rate, based on a compounding period over one year. Note that APYs provided are rather ballpark level indicators and not so much precise future results.",
  runway: "Runway, is the number of days sNRK emissions can be sustained at a given rate. Lower APY = longer runway",
};

export const itemType = {
  dollar: "$",
  percentage: "%",
};
