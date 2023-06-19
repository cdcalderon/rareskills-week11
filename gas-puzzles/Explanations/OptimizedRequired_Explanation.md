The challenge is about optimizing a Solidity smart contract for gas usage. The original contract, `Require`, has a function `purchaseToken` that allows a user to purchase a token if certain conditions are met. The goal is to optimize this function to reduce its gas usage.

Here's the original contract:

```solidity
// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.15;

contract Require {
    uint256 constant COOLDOWN = 1 minutes;
    uint256 lastPurchaseTime;

    function purchaseToken() external payable {
        require(
            msg.value == 0.1 ether &&
                block.timestamp > lastPurchaseTime + COOLDOWN,
            'cannot purchase'
        );
        lastPurchaseTime = block.timestamp;
        // mint the user a token
    }
}
```

The `purchaseToken` function uses a `require` statement to check if the sent value is equal to `0.1 ether` and if the time since the last purchase is greater than the `cooldown` period.

The optimized version of the contract uses a custom error `CannotPurchase`.

Here's the optimized purchaseToken function:

```solidity
function purchaseToken() external payable {
    // The if statement checks the conditions for purchasing a token.
    // If the conditions are not met, the function reverts with the custom error CannotPurchase.
    // Using a custom error instead of a string error message in a require statement saves gas
    // because the EVM does not need to store and revert with a string message.

    if (msg.value != 0.1 ether || block.timestamp <= lastPurchaseTime + COOLDOWN) {
        revert CannotPurchase();
    }


    lastPurchaseTime = block.timestamp;
    // mint the user a token
}
```

In this optimized version, the `require` statement is replaced with an `if statement` that throws the custom error `CannotPurchase` if the conditions are not met. This is more `gas-efficient` than using a require statement with a string error message.
