import {
  Button,
  CardContent,
  CardWrapper,
  Col,
  Divider,
  H1,
  Input,
  InputWrapper,
  Label,
  Row,
} from "./common/components";
import Loading from "./Loading";

const ApproveAndDepositComp = ({
  setDepositAmount,
  approveDAIMint,
  depositDAI,
  isLoading,
  depositAmount,
}) => {
  const isValid = (() => {
    if (parseFloat(depositAmount) > 0) return true;
    return false;
  })();
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
          </InputWrapper>
          <Row>
            <Button
              type="button"
              onClick={approveDAIMint}
              disabled={!isValid || isLoading}
            >
              Approve
            </Button>
            <Button
              type="button"
              onClick={depositDAI}
              disabled={!isValid || isLoading}
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
