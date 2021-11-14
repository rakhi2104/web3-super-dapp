import { useEffect, useState } from "react";
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
} from "./common/components";
import Loading from "./Loading";

const StreamComp = ({
  setStreamReceipientAddress,
  setStreamRate,
  triggerDAIFlow,
  streamRate,
  streamRecipient,
  isAddress,
  streamInProgress,
  closeDAIStream,
  account,
  fetchingUserDetailsInProgress,
}) => {
  const isValid = (() => {
    if (parseFloat(streamRate) > 0) return true;
    return false;
  })();

  const [invalidAddress, setInvalidAddress] = useState(false);

  useEffect(() => {
    if (streamRecipient) {
      if (!isAddress(streamRecipient)) {
        setInvalidAddress("Invalid recipient address");
      } else if (streamRecipient === account) {
        setInvalidAddress(
          "Recipient address cannot be same as current address"
        );
      } else {
        setInvalidAddress(null);
      }
    }
  }, [streamRecipient, isAddress, account]);

  const inProgress = fetchingUserDetailsInProgress || streamInProgress;

  return (
    <CardWrapper flex={1}>
      <Row strict>
        <H1>Stream DAI</H1>
        <Loading isLoading={inProgress} />
      </Row>
      <Divider />
      <CardContent>
        <Col>
          <InputWrapper>
            <Label htmlFor="recipient-address">Recipient Address</Label>
            <Input
              value={streamRecipient}
              name="recipient-address"
              type="text"
              disabled={inProgress}
              placeholder="Enter recipient's wallet address"
              onChange={(e) => setStreamReceipientAddress(e.target.value)}
            />
            {invalidAddress && <ErrorMessage>{invalidAddress}</ErrorMessage>}
          </InputWrapper>
          <InputWrapper>
            <Label htmlFor="flow-rate">Rate</Label>
            <span>
              <Input
                value={streamRate}
                disabled={inProgress}
                name="flow-rate"
                placeholder="Enter rate of flow"
                type="number"
                onChange={(e) => setStreamRate(e.target.value)}
                min={1}
              />{" "}
              DAIx per month
            </span>
          </InputWrapper>
        </Col>
        <Row>
          <Button
            type="button"
            disabled={invalidAddress || !isValid}
            onClick={() => {
              if (streamInProgress) {
                closeDAIStream();
              } else {
                if (isAddress(streamRecipient)) {
                  triggerDAIFlow();
                } else {
                  setInvalidAddress("Invalid recipient address");
                }
              }
            }}
          >
            {streamInProgress ? "Stop" : "Start"} Stream
          </Button>
        </Row>
      </CardContent>
    </CardWrapper>
  );
};

export default StreamComp;
