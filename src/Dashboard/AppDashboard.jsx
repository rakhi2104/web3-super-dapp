import { useWeb3React } from "@web3-react/core";
import React, { useEffect, useState } from "react";
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
import ERC20ABI from "../common/ERC20ABI.json";
import { formatAddress } from "../common/utils";
import WelcomeScreen from "../WelcomeScreen/WelcomeScreen";

let token;

// Addresses on Rinkeby. Refer: https://docs.superfluid.finance/superfluid/protocol-developers/networks#test-networks
const fDAI = "0x15F0Ca26781C3852f8166eD2ebce5D18265cceb7";
const fDAIx = "0x745861AeD1EEe363b4AaA5F1994Be40b1e05Ff90";

function AppDashboard() {
  const data = useWeb3React();
  const { active, account, activate, deactivate, chainId, library } = data;
  const [approved, setApproved] = useState(false);
  const [approvedVal, setApprovedVal] = useState(0);

  useEffect(() => {
    if (account !== "" && active) {
      const Init = async () => {
        if (active) {
          // do something

          token = new library.eth.Contract(ERC20ABI, fDAI);
          // token = new library.eth.Contract(SuperTokenABI);
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

  useEffect(() => {
    if (approved) {
      // get Approved val
      // setApprovedVal
      console.log("getting approval val");
    }
  }, [approved]);

  // Do custom call
  async function callFn() {
    try {
      // console.log({ token });
      const encodedData = token.methods
        .transfer(
          "0xa78a6CFDe1c40f9fBdaa1a3DD6ac9AeD0bBe3A84", // receiver
          "1000000000000000000" // amount
        )
        .encodeABI();

      const txnObj = {
        from: account,
        to: fDAI,
        value: 0,
        data: encodedData,
      };

      const r = await library.eth.sendTransaction(txnObj);
      if (r) {
        setApproved(true);
      }
      console.log({ r });
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
