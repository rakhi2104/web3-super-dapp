import { wad4human } from "@decentral.ee/web3-helpers";
import SuperfluidSDK from "@superfluid-finance/js-sdk";
import { useWeb3React } from "@web3-react/core";
import React, { useCallback, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Web3 from "web3";
import ApproveAndDepositComp from "./ApproveAndDeposit";
import BalanceCard from "./BalanceCard";
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
  Row,
} from "./common/components";
import { injected } from "./common/connector";
import { INITIAL_BALANCE_STATE, METAMASK_ICON } from "./common/constants";
import { formatAddress } from "./common/utils";
import StreamComp from "./Stream";

let sf, dai, daix;

function AppDashboard() {
  const [balance, setBalance] = useState(INITIAL_BALANCE_STATE);
  const [fetchingBalance, setFetchingBalance] = useState(true);
  const data = useWeb3React();
  const { active, account, activate, deactivate, library } = data;
  const fetchBalances = useCallback(async () => {
    setFetchingBalance(true);
    const daiBalance = wad4human(await dai.balanceOf(account));
    const daixBalance = wad4human(await daix.balanceOf(account));

    setBalance((prevBal) => ({ ...prevBal, daiBalance, daixBalance }));
    setFetchingBalance(false);
  }, [account]);

  const [depositAmount, setDepositAmount] = useState(0);

  const [streamRecipient, setStreamReceipientAddress] = useState("");
  const [streamRate, setStreamRate] = useState(0);

  const [streamInProgress, setStreamInProgress] = useState(false);

  const getExistingStreamDetails = useCallback(async () => {
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
      }
    }
  }, [account]);

  const Init = useCallback(async () => {
    if (active) {
      setFetchingBalance(true);
      sf = new SuperfluidSDK.Framework({
        web3: new Web3(Web3.givenProvider),
        tokens: ["fDAI"],
      });
      await sf.initialize();
      dai = await sf.contracts.TestToken.at(sf.tokens.fDAI.address);
      daix = sf.tokens.fDAIx;

      await getExistingStreamDetails();
      fetchBalances();
    }
  }, [active, fetchBalances, getExistingStreamDetails]);

  useEffect(() => {
    if (account !== "") {
      Init();
    }
  }, [account, Init]);

  async function connect() {
    try {
      await activate(injected, (e) => {
        if (e) {
          toast.error(e.message);
        }
      });
      toast.success("Welcome!!");
    } catch (err) {
      console.log(err);
    }
  }

  function reset() {
    setBalance(INITIAL_BALANCE_STATE);
    setDepositAmount(0);
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

  const [loading, setLoading] = useState(false);

  const approveDAIMint = async () => {
    setLoading(true);
    try {
      const d = await dai.mint(
        account,
        library.utils.toWei(depositAmount, "ether")
      );
      if (d?.tx) {
        toast.success(`Successfully approved ${depositAmount} DAI`);
      }
      fetchBalances();
    } catch (e) {
      const { message } = e;
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const depositDAI = async () => {
    setLoading(true);
    try {
      const d1 = await dai.approve(daix.address, "1" + "0".repeat(40), {
        from: account,
      });
      if (d1?.tx) {
        toast.success(`Successfully signed`);
        const d2 = await daix.upgrade(
          library.utils.toWei(depositAmount, "ether"),
          {
            from: account,
          }
        );
        if (d2?.tx) {
          toast.success(`Successfully minted ${depositAmount} DAIx`);
        }
      }
      fetchBalances();
    } catch (e1) {
      const { message } = e1;
      toast.error(message);
    } finally {
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
      const a = await sender.flow({
        recipient: "" + streamRecipient,
        flowRate: "" + streamRate,
      });
      if (a?.tx) {
        toast.success(
          `Successfully started streaming ${streamRate} DAIx/month to ${formatAddress(
            streamRecipient
          )}`
        );
      }
    } catch (e) {
      setStreamInProgress(false);
      toast.error(e?.message || e);
    }
  };

  const closeDAIStream = async () => {
    const sender = sf.user({
      address: account,
      token: daix.address,
    });
    try {
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
    } catch (e) {
      toast.error(e?.message || e);
    }
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
                    <AccountImg src={METAMASK_ICON} alt="account logo" />
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
            depositDAI={depositDAI}
            approveDAIMint={approveDAIMint}
            setDepositAmount={setDepositAmount}
            depositAmount={depositAmount}
            isLoading={loading}
          />
          <StreamComp
            setStreamRate={setStreamRate}
            setStreamReceipientAddress={setStreamReceipientAddress}
            triggerDAIFlow={triggerDAIFlow}
            streamRate={streamRate}
            streamRecipient={streamRecipient}
            streamInProgress={streamInProgress}
            isAddress={library?.utils?.isAddress}
            closeDAIStream={closeDAIStream}
          />
        </Row>
      )}
      <Toaster position="top-right" gutter={8} />
    </>
  );
}

export default AppDashboard;
