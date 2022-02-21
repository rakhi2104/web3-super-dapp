import React from "react";
import { Button, CardContent, CardWrapper } from "../common/components";

const WelcomeScreen = ({ connect }) => {
  return (
    <CardWrapper>
      <CardContent centered>
        <Button onClick={connect}>Connect Wallet</Button>
      </CardContent>
    </CardWrapper>
  );
};

export default WelcomeScreen;
