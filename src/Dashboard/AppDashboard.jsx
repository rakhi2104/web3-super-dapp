import { useWeb3React } from "@web3-react/core";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import {
  Button,
  CardContent,
  CardWrapper,
  Chip,
  Col,
  Currency,
  Divider,
  H1,
  Row,
} from "../common/components";
import { injected } from "../common/connector";
import { CHAIN_ID } from "../common/constants";
import { formatAddress } from "../common/utils";
import WelcomeScreen from "../WelcomeScreen/WelcomeScreen";

function AppDashboard() {
  const data = useWeb3React();
  const { active, account, activate, deactivate, chainId } = data;

  useEffect(() => {
    if (account !== "" && active) {
      const Init = async () => {
        if (active) {
          // do something
        } else {
          reset();
        }
      };
      Init();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, active]);

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
    // handle reset
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

  // Do custom call
  async function callFn() {
    try {
    } catch (e) {
      console.log(e);
    }
  }

  if (!active) {
    return <WelcomeScreen connect={connect} />;
  }

  return (
    <>
      <Row>
        <Col>
          <CardWrapper flex={1}>
            <H1>{!account ? "Welcome" : "Connected Account"}</H1>
            <Divider />
            <CardContent centered>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <div style={{ flex: 1 }}>
                  <Currency title={account}>{formatAddress(account)}</Currency>
                  <Chip>
                    <strong>{CHAIN_ID[chainId] || ""}</strong> Network
                  </Chip>
                  <div>
                    <Button type="button" onClick={disconnect}>
                      Disconnect Wallet
                    </Button>
                  </div>
                </div>
                <div style={{ flex: 1 }}>
                  <Button type="button" onClick={callFn}>
                    Call Function
                  </Button>
                </div>
              </div>
            </CardContent>
          </CardWrapper>
        </Col>
      </Row>
    </>
  );
}

export default AppDashboard;
