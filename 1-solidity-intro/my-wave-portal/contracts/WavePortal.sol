// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.17;

import "hardhat/console.sol";

contract WavePortal {
    uint256 totalWaves;
    address[] allSenders;

    constructor() {
        console.log("Yo yo, I am a contract and I am smart");
    }

    function wave() public {
        totalWaves += 1;
        allSenders.push(msg.sender);
        console.log("%s has waved!", msg.sender);
        // Log all senders
        for (uint256 i = 0; i < allSenders.length; i++) {
            console.log("Sender %d is %s", i, allSenders[i]);
        }
    }

    function getTotalWaves() public view returns (uint256) {
        console.log("We have %d total waves!", totalWaves);
        return totalWaves;
    }
}
