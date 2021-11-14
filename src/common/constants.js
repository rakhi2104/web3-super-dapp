export const LAYOUTS = {
  XSMALL: "@media only screen and (max-width: 595px)",
  SMALL: "@media only screen and (max-width: 600px)",
  TABLET: "@media only screen and (max-width: 768px)",
  LARGE: "@media only screen and (max-width: 889px)",
  XLARGE: "@media only screen and (max-width: 1200px)",
};

export const NETWORKS = {
  GOERLI: "goerli",
  RINKEBY: "rinkeby",
  ROPSTEN: "ropsten",
};

export const TOKEN_ADDRESSES = {
  [NETWORKS.GOERLI]: {
    fDAI: "0x88271d333C72e51516B67f5567c728E702b3eeE8",
    fDAIx: "0xF2d68898557cCb2Cf4C10c3Ef2B034b2a69DAD00",
  },
};

export const SIMPLE_ABI = [
  // balanceOf
  {
    constant: true,
    inputs: [{ name: "_owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "balance", type: "uint256" }],
    type: "function",
  },
  // decimals
  {
    constant: true,
    inputs: [],
    name: "decimals",
    outputs: [{ name: "", type: "uint8" }],
    type: "function",
  },
];

export const INITIAL_BALANCE_STATE = { daiBalance: "0", daixBalance: "0" };

// const ADDRESSES = {
//   SENDER: "0x2d21388dd08232060C01cEb08eBaFb68D16423fB",
//   RECEIVER: "0xa78a6CFDe1c40f9fBdaa1a3DD6ac9AeD0bBe3A84",
// };

// const FLOW_RATE = "385802469135802";

export const TOASTS_LIMIT = 3;

export const REPEAT_FETCH_BALANCE_INTERVAL = 5000;
