import styled from "styled-components";
import { LAYOUTS } from "./constants";

const AppWrapper = styled.div`
  min-height: calc(100vh - 72px);
  padding: 36px;
  font-size: 18px;
  max-width: 75%;
  margin: 0 auto;
  ${LAYOUTS.LARGE} {
    padding: 8px;
    padding-bottom: 96px;
    min-height: calc(100vh - 36px);
    max-width: 100%;
    margin: auto;
  }
`;

const CardWrapper = styled.div`
  background-color: #ffffff;
  border-radius: 6px;
  box-shadow: 0 0 6px rgb(0 0 0 / 10%), 0px 2px 2px rgb(0 0 0 / 10%);
  margin: 8px 12px;
  min-height: 180px;

  ${({ flex }) => `flex: ${flex || 1} 0 auto;`}
`;

const CardContent = styled.div`
  padding: 16px;
  ${({ centered }) => centered && "text-align: center;"}
`;

const Row = styled.div`
  align-items: stretch;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-flow: row wrap;
  ${({ strict = false }) =>
    !strict &&
    `
  ${LAYOUTS.LARGE} {
    flex-direction: column;
  }
  `}
`;

const Col = styled.div`
  flex: 1 0 auto;
  display: flex;
  flex-direction: column;
`;

const H1 = styled.h1`
  font-size: 24px;
  font-weight: normal;
  padding: 16px;
  color: var(--secondary-text-color);
`;

const H2 = styled.h2`
  font-size: 18px;
  font-weight: normal;
  padding: 16px;
  color: var(--secondary-text-color);
`;

const Currency = styled.h3`
  font-size: 36px;
  padding: 24px;
  font-weight: 400;
  & > span.token {
    font-size: 24px;
    margin-right: 8px;
    text-align: center;
    color: var(--secondary-color);
  }
`;

const Chip = styled.h4`
  font-size: 16px;
  padding: 8px 16px;
  margin: 12px auto;
  border: 1px solid var(--primary-color);
  border-radius: 16px;
  width: fit-content;
`;

const Divider = styled.hr`
  border-color: rgb(148 163 184 / 20%);
  margin: 0;
`;

const Button = styled.button`
  background-color: var(--primary-color-light);
  border-radius: 4px;
  border: 0;
  color: var(--primary-color);
  cursor: pointer;
  font-weight: 600;
  height: 32px;
  margin: 8px 0;
  outline: 0;
  transition: all 0.1s ease-in-out;
  padding: 0 16px;
  &:hover,
  &:focus:not(:disabled) {
    background-color: var(--primary-color--hover);
  }

  &:disabled {
    background-color: var(--disabled);
    color: var(--secondary-text-color);
    cursor: not-allowed;
  }
`;

const Label = styled.label`
  padding-bottom: 6px;
  font-size: 16px;
`;

const Input = styled.input`
  padding: 8px 12px;
  border-radius: 4px;
  outline: 0;
  border: 2px solid var(--primary-color-light);
  font-size: 16px;
  transition: all 0.1s ease-in-out;
  &:hover,
  &:focus {
    border-color: var(--primary-color);
  }

  &:disabled {
    background-color: var(--disabled);
    cursor: not-allowed;
    border: 2px solid var(--primary-color--hover);
  }
`;

const InputWrapper = styled.div`
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
`;

const AccountImg = styled.img`
  width: 96px;
  height: 96px;
  background-color: var(--primary-color-light);
  border-radius: 50%;
  margin: auto;
`;

const Loader = styled.div`
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  border: 4px solid var(--primary-color-light);
  border-top: 4px solid var(--primary-color);
  border-radius: 50%;
  width: 20px;
  height: 20px;
  margin: 12px;
  animation: spin 1s cubic-bezier(0.28, 0.68, 0.75, 0.15) infinite;
`;

const ErrorMessage = styled.p`
  color: var(--error-color);
  font-size: 14px;
  padding-top: 6px;
`;

const NoteMessage = styled.p`
  color: var(--primary-color);
  font-size: 14px;
  padding-top: 6px;
  text-align: center;
`;

export {
  AccountImg,
  AppWrapper,
  Button,
  CardContent,
  CardWrapper,
  Chip,
  Col,
  Currency,
  Divider,
  ErrorMessage,
  H1,
  H2,
  Input,
  InputWrapper,
  Label,
  Loader,
  NoteMessage,
  Row,
};
