import Onboard from "bnc-onboard";
import { useEffect, useState } from "react";
import Web3 from "web3";

export const useOnboard = () => {
  const [onboard, setOnboard] = useState();
  const [wallet, setWallet] = useState();
  const [address, setAddress] = useState(null);

  // const [balance, setBalance] = useState(null);
  const [isWalletSelected, setWalletSelected] = useState(false);
  const [provider, setProvider] = useState();

  useEffect(() => {
    setOnboard(
      Onboard({
        networkId: 5,
        subscriptions: {
          wallet: (wallet) => {
            if (wallet?.provider && wallet.name) {
              setWallet(wallet);

              const provider = new Web3(wallet.provider);
              setProvider(provider);

              window.localStorage.setItem("activeWallet", wallet.name);
            }
          },
          address: (address) => {
            if (address) {
              setAddress(address);
            }
          },
          // balance: (balance) => {
          //   if (isWalletSelected) {
          //     setBalance(balance);
          //   }
          // },
        },
      })
    );
  }, []);

  useEffect(() => {
    const previouslySelectedWallet =
      window.localStorage.getItem("activeWallet");
    if (previouslySelectedWallet && onboard) {
      onboard.walletSelect(previouslySelectedWallet);
      setWalletSelected(true);
    }
  }, [onboard]);

  const selectWallet = async () => {
    if (!isWalletSelected && onboard) {
      await onboard.walletSelect();
      if (wallet) await onboard.walletCheck();

      setWalletSelected(true);
    }
  };

  const disconnectWallet = () => {
    if (onboard) {
      onboard.walletReset();

      setWalletSelected(false);
      // setBalance(null);
      setAddress(null);

      window.localStorage.removeItem("activeWallet");
    }
  };

  return {
    onboard,
    wallet,
    address,
    // balance,
    isWalletSelected,
    selectWallet,
    disconnectWallet,
    provider,
  };
};
