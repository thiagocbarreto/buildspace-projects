// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0; // ! Be sure that the compiler version is the same in hardhat.config.js

import "hardhat/console.sol";

contract WavePortal {
  uint256 totalWaves;
  
  constructor() {
    console.log("My first contract!!");
  }

  function wave() public { // The `public`keyword makes the function available to be called
                           // on the blockchain.
    totalWaves += 1;
    console.log("%s has waved!", msg.sender); // `msg.sender` is the wallet address of the
                                              // person who called the function
  }

  function getTotalWaves() public view returns (uint256) {
    console.log("We have %d total waves!", totalWaves);
    return totalWaves;
  }
}