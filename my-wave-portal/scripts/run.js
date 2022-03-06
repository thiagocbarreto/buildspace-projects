const main = async () => {
  // 1. Compile our contract and generate the necessary files we need to work with our
  //    contract under the `artifacts` directory.
  const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");

  //  2. Hardhat will create a local Ethereum network for us, but just for this contract.
  //     Then, after the script compĺetes it'll destroy that local network. Every time you
  //     run the contract, it'll be a fresh blockchain.
  const waveContract = await waveContractFactory.deploy();

  // 3. Wait until our contract is officially deployed to our local blockchain. Our `constructor`
  //    runs when we actually deploy.
  await waveContract.deployed();

  // 4. Once it's deployed `waveContract.address` will basically give us the address of the
  //    deployed contract. This address is how we can find our contract on the blockchain.
  //    There are millions of contracts on the actual blockchain. So, this address gives us
  //    easy access to the contract we're interested in working with. This will be more
  //    important a bit later once we deploy to a real Ethereum network.
  console.log("Contract deployed to: ", waveContract.address);
}

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

runMain();