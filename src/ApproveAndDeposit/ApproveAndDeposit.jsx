import { useState } from "react";
import toast from "react-hot-toast";
import {
  Button,
  CardContent,
  CardWrapper,
  Col,
  Divider,
  ErrorMessage,
  H1,
  Input,
  InputWrapper,
  Label,
  Row,
} from "../common/components";
import Loading from "../common/Loading";

const ApproveAndDepositComp = ({
  setDepositAmount,
  approveDAI,
  depositDAI,
  isLoading,
  depositAmount,
  balance,
}) => {
  const [errorMessage, setErrorMessage] = useState(null);
  const isValidNumber = (() => {
    if (parseFloat(depositAmount) > 0) return true;
    return false;
  })();

  const validAmount = () => {
    if (parseFloat(depositAmount) > parseFloat(balance?.daiBalance)) {
      setErrorMessage("Insufficient funds");
      toast.error("Insufficient funds");
      return false;
    } else {
      setErrorMessage(null);
    }
    return true;
  };

  return (
    <CardWrapper flex={1}>
      <Row strict>
        <H1>Approve &amp; Deposit DAI</H1>
        <Loading isLoading={isLoading} />
      </Row>
      <Divider />
      <CardContent>
        <Col>
          <InputWrapper>
            <Label htmlFor="deposit-amout">Amount</Label>
            <Input
              placeholder="Enter amount to be deposited"
              name="deposit-amount"
              type="number"
              onChange={(e) => setDepositAmount(e.target.value)}
              min={1}
              disabled={isLoading}
            />
            {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
          </InputWrapper>
          <Row>
            <Button
              type="button"
              onClick={() => {
                if (validAmount()) {
                  approveDAI();
                }
              }}
              disabled={!isValidNumber || isLoading}
            >
              Approve
            </Button>
            <Button
              type="button"
              onClick={() => {
                if (validAmount()) {
                  depositDAI();
                }
              }}
              disabled={!isValidNumber || isLoading}
            >
              Deposit
            </Button>
          </Row>
        </Col>
      </CardContent>
    </CardWrapper>
  );
};

export default ApproveAndDepositComp;
