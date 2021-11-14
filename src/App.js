import { Web3ReactProvider } from "@web3-react/core";
import React, { useEffect } from "react";
import toast, { Toaster, useToasterStore } from "react-hot-toast";
import Web3 from "web3";
import { AppWrapper } from "./common/components";
import { TOASTS_LIMIT } from "./common/constants";
import AppDashboard from "./Dashboard/AppDashboard";

function App() {
  const getLibrary = () => {
    return new Web3(Web3.givenProvider);
  };

  const { toasts } = useToasterStore();

  useEffect(() => {
    toasts
      .filter((t) => t.visible)
      .filter((_, i) => i >= TOASTS_LIMIT)
      .filter((t) => toast.dismiss(t.id));
  }, [toasts]);

  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <AppWrapper>
        <AppDashboard />
        <Toaster position="bottom-center" gutter={8} />
      </AppWrapper>
    </Web3ReactProvider>
  );
}

export default App;
