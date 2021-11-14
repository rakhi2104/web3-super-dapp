import { InjectedConnector } from "@web3-react/injected-connector";
import { VALID_CHAIN_ID } from "./constants";

export const injected = new InjectedConnector({
  supportedChainIds: VALID_CHAIN_ID,
});
