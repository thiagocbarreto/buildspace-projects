# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.js
```

## My Commands

1. `npx hardhat run scripts/run.js`: use to validate that the smart contract work as expected (creates an ethereum blockchain and after all it's done it gets shutdown)

2. `npx hardhat node`: deploys a new local ethereum blockchain (use with command `#3`)

3. `npx hardhat run scripts/deploy.js --network localhost`: deploys smart contract to local blockchain (use with command `#2`)

4. `npx hardhat run scripts/deploy.js --network goerli`: deploys smart contract to Goerli testnet blockchain

   - Always remember to update the frontend with the new contract address and the new ABI file. Otherwise, it will break.
