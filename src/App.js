import { Web3ReactProvider } from "@web3-react/core";
import React from "react";
import Web3 from "web3";
import AppDashboard from "./AppDashboard";
import { AppWrapper } from "./common/components";

function App() {
  const getLibrary = () => {
    return new Web3(Web3.givenProvider);
  };
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <AppWrapper>
        <AppDashboard />
      </AppWrapper>
    </Web3ReactProvider>
  );
}

export default App;
