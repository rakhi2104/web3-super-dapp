import { wad4human } from "@decentral.ee/web3-helpers";
import SuperfluidSDK from "@superfluid-finance/js-sdk";
import { useWeb3React } from "@web3-react/core";
import React, { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import Web3 from "web3";
import ApproveAndDepositComp from "../ApproveAndDeposit/ApproveAndDeposit";
import BalanceCard from "../BalanceCard/BalanceCard";
import {
  AccountImg,
  Button,
  CardContent,
  CardWrapper,
  Chip,
  Col,
  Currency,
  Divider,
  H1,
  NoteMessage,
  Row,
} from "../common/components";
import { injected } from "../common/connector";
import {
  INITIAL_BALANCE_STATE,
  REPEAT_FETCH_BALANCE_INTERVAL,
} from "../common/constants";
import { formatAddress } from "../common/utils";
import Logo from "../MetaMask_Fox.png";
import StreamComp from "../Stream/Stream";

let sf, dai, daix;

const { REACT_APP_GAS_API_TOKEN } = process.env;

function AppDashboard() {
  const [balance, setBalance] = useState(INITIAL_BALANCE_STATE);
  const [depositAmount, setDepositAmount] = useState(0);
  const [estimatedGasPrice, setEstimatedGasPrice] = useState(null);
  const [fetchingBalance, setFetchingBalance] = useState(true);
  const [fetchingUserDetails, setFetchingUserDetails] = useState(true);
  const [loading, setLoading] = useState(false);
  const [repeatFetchId, setRepeatFetchId] = useState(null);
  const [streamInProgress, setStreamInProgress] = useState(false);
  const [streamRate, setStreamRate] = useState(0);
  const [streamRecipient, setStreamReceipientAddress] = useState("");

  const data = useWeb3React();
  const { active, account, activate, deactivate, library } = data;

  const fetchBalances = useCallback(async () => {
    console.log("Fetching balance");
    setFetchingBalance(true);
    const daiBalance = wad4human(await dai.balanceOf(account));
    const daixBalance = wad4human(await daix.balanceOf(account));

    setBalance((prevBal) => ({ ...prevBal, daiBalance, daixBalance }));
    setFetchingBalance(false);
  }, [account]);

  const repeatFetchBalance = useCallback(() => {
    const id = setInterval(fetchBalances, REPEAT_FETCH_BALANCE_INTERVAL);
    setRepeatFetchId(id);
  }, [fetchBalances]);

  const getExistingStreamDetails = useCallback(async () => {
    setFetchingUserDetails(true);
    try {
      const userDetails = await sf
        .user({ address: account, token: daix.address })
        .details();
      if (userDetails) {
        const outflows = userDetails.cfa?.flows?.outFlows;
        if (outflows?.length > 0) {
          const { flowRate, receiver } = outflows?.[0];
          setStreamInProgress(true);
          setStreamRate(flowRate);
          setStreamReceipientAddress(receiver);
          repeatFetchBalance();
        } else {
          setStreamInProgress(false);
          clearInterval(repeatFetchId);
        }
      }
    } catch (e) {
      toast.error(e);
    }
    setFetchingUserDetails(false);
  }, [account, repeatFetchBalance, repeatFetchId]);

  useEffect(() => {
    if (account !== "" && active) {
      const Init = async () => {
        if (active) {
          setFetchingBalance(true);
          sf = new SuperfluidSDK.Framework({
            web3: new Web3(Web3.givenProvider),
            tokens: ["fDAI"],
          });
          await sf.initialize();
          dai = await sf.contracts.TestToken.at(sf.tokens.fDAI.address);
          daix = sf.tokens.fDAIx;

          fetchBalances();
          await getExistingStreamDetails();
        } else {
          reset();
        }
      };
      Init();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, active, fetchBalances]);

  async function connect() {
    try {
      await activate(injected, (e) => {
        if (e) {
          toast.error(e.message);
        }
      });
    } catch (err) {
      console.log(err);
    }
  }

  function reset() {
    setBalance(INITIAL_BALANCE_STATE);
    setDepositAmount(0);
    setRepeatFetchId(null);
    setLoading(false);
    setStreamInProgress(false);
    setStreamRate(0);
    setStreamReceipientAddress("");
  }

  async function disconnect() {
    try {
      reset();
      toast.success("Thank you! See you again.");
      deactivate();
    } catch (err) {
      console.log(err);
    }
  }

  async function estimateGAS() {
    if (REACT_APP_GAS_API_TOKEN) {
      try {
        await fetch(
          "https://ethgasstation.info/api/ethgasAPI.json?api-key" +
            REACT_APP_GAS_API_TOKEN
        )
          .then((res) => res.json())
          .then((json) => {
            const { fast, block_time } = json;
            if (library?.utils) {
              const price = library?.utils?.fromWei("" + (fast / 10) * 10 ** 9);
              setEstimatedGasPrice({
                price,
                time: parseFloat(block_time).toFixed(2),
              });
            }
          });
      } catch (e) {
        console.log(e);
      }
    } else {
      console.log("No token provided");
    }
  }

  const resetGAS = () => {
    setEstimatedGasPrice(0);
  };

  // const approveDAIMint = async () => {
  //   setLoading(true);
  //   try {
  //     estimateGAS();
  //     const d = await dai.mint(
  //       account,
  //       library.utils.toWei(depositAmount, "ether")
  //     );
  //     if (d?.tx) {
  //       toast.success(`Successfully approved ${depositAmount} DAI`);
  //     }
  //     fetchBalances();
  //   } catch (e) {
  //     const { message } = e;
  //     toast.error(message);
  //   } finally {
  //     resetGAS();
  //     setLoading(false);
  //   }
  // };

  const approveDAI = async () => {
    setLoading(true);
    try {
      estimateGAS();
      const d1 = await dai.approve(daix.address, "1" + "0".repeat(40), {
        from: account,
      });
      if (d1?.tx) {
        toast.success(`Successfully signed`);
      }
      fetchBalances();
    } catch (e1) {
      const { message } = e1;
      toast.error(message);
    } finally {
      resetGAS();
      setLoading(false);
    }
  };

  const depositDAI = async () => {
    setLoading(true);
    try {
      estimateGAS();
      const d2 = await daix.upgrade(
        library.utils.toWei(depositAmount, "ether"),
        {
          from: account,
        }
      );
      if (d2?.tx) {
        toast.success(`Successfully minted ${depositAmount} DAIx`);
      }
      fetchBalances();
    } catch (e1) {
      const { message } = e1;
      toast.error(message);
    } finally {
      resetGAS();
      setLoading(false);
    }
  };

  const triggerDAIFlow = async () => {
    setStreamInProgress(true);
    const sender = sf.user({
      address: account,
      token: daix.address,
    });
    try {
      estimateGAS();
      const a = await sender.flow({
        recipient: "" + streamRecipient,
        flowRate: "" + streamRate,
      });
      if (a?.tx) {
        repeatFetchBalance();
        toast.success(
          `Successfully started streaming ${streamRate} DAIx/month to ${formatAddress(
            streamRecipient
          )}`
        );
      }
    } catch (e) {
      resetGAS();
      setStreamInProgress(false);
      toast.error(e?.message || e);
    } finally {
      resetGAS();
    }
  };

  const closeDAIStream = async () => {
    const sender = sf.user({
      address: account,
      token: daix.address,
    });
    try {
      estimateGAS();
      const a = await sender.flow({
        recipient: "" + streamRecipient,
        flowRate: "0",
      });
      if (a?.tx) {
        toast.success(
          `Successfully stopped streaming to ${formatAddress(streamRecipient)}`
        );
      }
      setStreamInProgress(false);
      setStreamReceipientAddress("");
      setStreamRate(0);
      fetchBalances();
      clearInterval(repeatFetchId);
      setRepeatFetchId(null);
    } catch (e) {
      toast.error(e?.message || e);
    }
    resetGAS();
  };

  return (
    <>
      <Row>
        <Col>
          <CardWrapper flex={1}>
            <H1>{!account ? "Welcome" : "Connected Account"}</H1>
            <Divider />
            <CardContent centered>
              <Col>
                {active && (
                  <>
                    <AccountImg src={Logo} alt="account logo" />
                    <Currency title={account}>
                      {formatAddress(account)}
                    </Currency>
                    <Chip>Goerli Test Network</Chip>
                  </>
                )}
                <div>
                  <Button
                    type="button"
                    onClick={() => {
                      if (active) {
                        disconnect();
                      } else {
                        connect();
                      }
                    }}
                  >
                    {active ? "Disconnect" : "Connect"} Wallet
                  </Button>
                </div>
              </Col>
            </CardContent>
          </CardWrapper>
        </Col>
        {active && (
          <Col>
            <BalanceCard
              isLoading={fetchingBalance}
              title="DAI Balance"
              value={balance?.daiBalance}
              token="DAI"
            />
            <BalanceCard
              isLoading={fetchingBalance}
              title="DAIx Balance"
              value={balance?.daixBalance}
              token="DAIx"
            />
          </Col>
        )}
      </Row>
      {active && (
        <Row>
          <ApproveAndDepositComp
            approveDAI={approveDAI}
            balance={balance}
            depositAmount={depositAmount}
            depositDAI={depositDAI}
            isLoading={loading}
            setDepositAmount={setDepositAmount}
          />
          <StreamComp
            account={account}
            closeDAIStream={closeDAIStream}
            fetchingUserDetailsInProgress={fetchingUserDetails}
            isAddress={library?.utils?.isAddress}
            setStreamRate={setStreamRate}
            setStreamReceipientAddress={setStreamReceipientAddress}
            streamInProgress={streamInProgress}
            streamRate={streamRate}
            streamRecipient={streamRecipient}
            triggerDAIFlow={triggerDAIFlow}
          />
        </Row>
      )}
      {library && Boolean(estimatedGasPrice) && (
        <NoteMessage>
          Estimated gas price of {estimatedGasPrice?.price} ETH and{" "}
          {estimatedGasPrice.time} seconds for approval
        </NoteMessage>
      )}
    </>
  );
}

export default AppDashboard;
