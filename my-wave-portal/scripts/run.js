const main = async () => {
  // In order to deploy something to the blockchain, we need to have a wallet address!
  // Hardhat does this for us magically in the background, but here I grabbed the wallet
  // address of contract owner and I also grabbed a random wallet address and called it `randomPerson`.
  const [owner, randomPerson] = await hre.ethers.getSigners();

  // Compile our contract and generate the necessary files we need to work with our
  // contract under the `artifacts` directory.
  const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");

  // Hardhat will create a local Ethereum network for us, but just for this contract.
  // Then, after the script compĺetes it'll destroy that local network. Every time you
  // run the contract, it'll be a fresh blockchain.
  const waveContract = await waveContractFactory.deploy();

  // Wait until our contract is officially deployed to our local blockchain. Our `constructor`
  // runs when we actually deploy.
  await waveContract.deployed();

  // Once it's deployed `waveContract.address` will basically give us the address of the
  // deployed contract. This address is how we can find our contract on the blockchain.
  // There are millions of contracts on the actual blockchain. So, this address gives us
  // easy access to the contract we're interested in working with. This will be more
  // important a bit later once we deploy to a real Ethereum network.
  console.log("Contract deployed to: ", waveContract.address);

  // Just to see the address of the person deploying our contract.
  console.log("Contract deployed by: ", owner.address);

  let waveCount;
  waveCount = await waveContract.getTotalWaves();

  let waveTxn = await waveContract.wave();
  await waveTxn.wait();

  waveCount = await waveContract.getTotalWaves();

  waveTxn = await waveContract.connect(randomPerson).wave();
  await waveTxn.wait();
  
  waveCount = await waveContract.getTotalWaves();
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