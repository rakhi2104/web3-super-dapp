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

const ADDRESSES = {
  SENDER: "0x2d21388dd08232060C01cEb08eBaFb68D16423fB",
  RECEIVER: "0xa78a6CFDe1c40f9fBdaa1a3DD6ac9AeD0bBe3A84",
};

const FLOW_RATE = "385802469135802";

export const METAMASK_ICON =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAoCAMAAACl6XjsAAABfVBMVEVHcEx/Rh2ARx2ESiLwiCLMu67cfCagZDOddlJ+Rx7pgiPlfyPshSN/Rxx+Rh2CSB6ASB2JTR7gkkl1SCbQciPUwLLMu6+BSB5/Rx2DSR5+RxzefR3ogCPlfiPGuLHhfiP2jCTvhyN/Rx3nfyPfo2/lfCTIuK7kfyP2jCPkfiPuhSTFtKjogSThfCR/Rx5+Rx3lfiPeeiTDs6koIR2DSh/ifCajWx6qYCDckVOBSR7jfiTyiCOYYTXLcCKpXiHEs6fDs6fCsKYjHBwhHx8iHR0iICB1a2ZyaGIiHyCPTx7ogSTlfyTwhyOASB7ziSTngCTrgyT2jCTthCT1iyPuhCX4jSSESh5/Rx6ITR/+kSTYbyDheSLjfSPBaiPacSDdcyCvYSK0ZCGTVSPGcSblhi/ngSPqgSTdu56mXSDaeSP6jiPmfSD5jSQcGhvimFdqUj/TbSJARUsyQE6tbDLOeyzZx7nayr7hsog7Nza/raDjjUF/VTjFtKhKNCB0amRMd0DeAAAASnRSTlMAe/oOkv4TAwgrpnA9n1n9vkYfHPv+xu2r9mgN6uI4Us5ji/n9Ln7G7pO61/K35ZXYiUji5s21zMnb0/r5aMipm2UkYjSGnPy0/l1QcU4AAALOSURBVHhehdJXXxpNFAbwBYIgoICCIKhgi91ETe/9fZ3ZXui92bvp5bPnzCwzK79c+Fxws3/mOXN2BSe+0Tnh1oBKTI7eqvypSUnaHP4XDIVeRn1cucKSJIUj4wMF6cVgYDr2KsrVXE4imUx6mEmHgoH786ZZ3b3H/usZAWW7R3fsAFFNhCrVwmaKdY4ylZdaqEgjI4yxUm7mpAjvjABjbt/QIIZJ1MF+Pu+eY3MMuwEwl2sfEidiBcdaeUl6yrcEkzks38IWMBnG2gUVTrIljSco4LUNGZxRaeZASW4X63Q5hznHyTGqpAfRwU5+WKGtaxC1SQsSKb+tfOyeTHWRDEyuNGhpf7me5EBjoYowFoEZ+gFx7pH+FYaTA0qBfSG6ErI2KcxZJMxVDhSkS1sV4twuNls0wVi4CYpEJ6yHwXEmpHJ5OxJTGNHhMLjH/BP0uQp2GpTwVhHY+orAExLt9ChxWhFWprYcFihaNKLDegZt7U4FuRpbPtbssONgRNECVjm6wYJFrR+5XK/VavVa9byO4L3qpWqMl/qznGlipV46b5xdturYIK//54sND7sAR3SnlfbZxeVFFYkw3MHV9dIQv8CAQ7qlXl+1kUoO78mMsQvwXiRbh8VjEenEqat9NlvUBmLJol2v6jDe89U0Vb7sDQa7k/UjxZSp04mjpw1ewBBRuV6qVbCCRFmzNNE0rOVZP2EZE9F0u10F10qQsr1hVTQ0WTSs7KwP2NA0wjxlUHWCmJRlo5jNELdlYidQaR92RINRp1P4vfPxnSAszis3XLkMD3Gn8+P0dGHh697e3vdvJyf/f4CrLqm8xFx/+IQ+jH/+QgK/wHbek9ZZwhSkq1MbwUW/f+buRJyIfn79+e/TuGBfomfi6UBmjH3NIL19Ffd6J2YEmhX92UqGbpEHzlzzeuNxL6ht9lmG0g5w5PbrtbWJN2/HyGB/AYd1QUewqrrRAAAAAElFTkSuQmCC";
