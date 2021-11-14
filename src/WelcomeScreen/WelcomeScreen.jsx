import React from "react";
import {
  Button,
  CardContent,
  CardWrapper,
  Col,
  H1,
  Link,
  List,
  Row,
} from "../common/components";

const WelcomeScreen = ({ connect }) => {
  return (
    <CardWrapper>
      <CardContent>
        <Row>
          <H1>
            Welcome to <span className="highlight">Super DApp</span>
          </H1>
        </Row>
        <Col>
          <List>
            <li>
              This project assumes you are already familiar using{" "}
              <Link
                target="__blank"
                rel="noopener noreferrer"
                href="https://metamask.io/"
              >
                Metamask
              </Link>{" "}
              and/or similar Web3 wallets.
            </li>
            <li>
              This app is tested to work with Metamask wallet on the Goerli Test
              Network.
            </li>
            <li>
              There is a 🤏 amount of ETH involved in transactions in this app.
              To get yourself some Test ETH, navigate to{" "}
              <Link
                target="__blank"
                rel="noopener noreferrer"
                href="https://app.superfluid.finance/"
              >
                app.superfluid.finance
              </Link>{" "}
              and connect your wallet for some Test ETH and fake <i>DAI</i>{" "}
              (fDAI) tokens.
            </li>
            <li>
              From our app, you can view your DAI and DAIx token balances
              connected with the wallet.
            </li>
            <li>
              You can deposit/upgrade your fDAI tokens to DAIx (Super DAI)
              tokens using the "Approve &amp; Deposit DAI" section.
            </li>
            <li>
              You can also create a stream of <i>DAIx</i> to any recipient
              address on the same Goerli Test Network from the "Stream DAI"
              section. Read more about this on the{" "}
              <Link
                target="__blank"
                rel="noopener noreferrer"
                href="https://www.superfluid.finance/home"
              >
                Superfluid
              </Link>{" "}
              site.
            </li>
            <li>
              At the moment, we support the below networks:
              <ul>
                <li>Ropsten Test Network</li>
                <li>Kovan Test Network</li>
                <li>Rinkeby Test Network</li>
                <li>Goerli Test Network</li>
              </ul>
            </li>
          </List>
        </Col>
        <Button onClick={connect}>Connect Wallet</Button>
      </CardContent>
    </CardWrapper>
  );
};

export default WelcomeScreen;
