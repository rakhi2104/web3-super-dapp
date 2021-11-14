import {
  CardContent,
  CardWrapper,
  Currency,
  Divider,
  H1,
  Row,
} from "../common/components";
import Loading from "../common/Loading";
import { formatBalance } from "../common/utils";

const BalanceCard = ({ title, token, value, isLoading }) => {
  return (
    <CardWrapper flex={1}>
      <Row strict>
        <H1>{title}</H1>
        <Loading isLoading={isLoading} />
      </Row>
      <Divider />
      <CardContent>
        <Currency>
          <span className="token">{token}</span>
          <span title={value}>{formatBalance(value)}</span>
        </Currency>
      </CardContent>
    </CardWrapper>
  );
};

export default BalanceCard;
