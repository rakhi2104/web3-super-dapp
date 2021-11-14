# Web3 Super DApp

This project is an exploration of the [Superfluid.finance](https://superfluid.finance) SDK Web3.

:fire: :fire: :fire:
Try the app live here: [web3-super-dapp.vercel.app](https://web3-super-dapp.vercel.app/)

## Technologies Used

- React JS
- web3-react
- Styled Components
- Superfluid Finance JS SDK
- Web3
- ETHGastation (for gas price estimation)

## Running the App

- This app has been bootstrapped from the Create React App script.
- To install necessary dependencies, run `npm install` in the root directory.
- Optional:
  - To get gas price and time estimate, the ETHGastation API requires us to provide an API Key which can be obtained for free from [data.defipulse.com](https://data.defipulse.com). For further information visit [docs.ethgasstation.info](https://docs.ethgasstation.info/).
  - Once you obtain the API, create a `.env` file similar to `.env.example` and replace `xxxxxxxxxxxx` with your API Key.
- To run the app, run `npm start` in the root directory of the project and you should see the app runing on port 3000 in few seconds and you can access it at [http://localhost:3000](http://localhost:3000).

## About the App

- This project assumes you are already familiar using [Metamask](https://metamask.io/) and/or similar Web3 wallets.
- This app is tested to work with Metamask wallet on the Goerli Test Network.
- There is a :pinching_hand: amount of ETH involved in transactions in this app. To get yourself some Test ETH, navigate to [app.superfluid.finance](https://app.superfluid.finance/) and connect your wallet for some Test ETH and fake DAI (fDAI) tokens.
- From our app, you can view your DAI and DAIx token balances connected with the wallet.
- You can deposit/upgrade your fDAI tokens to DAIx (Super DAI) tokens using the "Approve & Deposit DAI" section.
- You can also create a stream of DAIx to any recipient address on the same Goerli Test Network from the "Stream DAI" section. Read more about this on the [Superfluid](https://www.superfluid.finance/home) site.

## TODO

- This app currently uses simple wallets based on the existing Ethereum extensions. To provide support for other wallets as well, a good choice is to include the [Blocknative Onboard SDK](https://docs.blocknative.com/onboard#).
