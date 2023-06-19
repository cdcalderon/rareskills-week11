## Gas Puzzles ArraySum

The challenge is about optimizing a Solidity smart contract for gas usage. The original contract, `ArraySum`, has a function `getArraySum` that calculates the sum of an array of integers. The goal is to optimize this function to reduce its gas usage without modifying any other part of the contract.

Here's the original contract:

```solidity
// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.15;

contract ArraySum {
    uint256[] array;

    function setArray(uint256[] memory _array) external {
        require(_array.length <= 10, "too long");
        array = _array;
    }

    function getArraySum() external view returns (uint256) {
        uint256 sum;
        for (uint256 i = 0; i < array.length; i++) {
            sum += array[i];
        }

        return sum;
    }
}
```

The `getArraySum` function uses a loop to iterate over the array and calculate the sum. This is not very gas efficient because accessing a state variable (like array) is a costly operation in terms of gas.

The optimized version of the contract uses the `unchecked` keyword to `disable overflow checks` for the increment operation, which saves some gas. It also moves the `sum += array[i];` operation inside the loop condition to save additional gas.

Here's the optimized contract:

```solidity
// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.15;

contract OptimizedArraySum {
    uint256[] array;

    function setArray(uint256[] memory _array) external {
        require(_array.length <= 10, "too long");
        array = _array;
    }

    function getArraySum() external view returns (uint256 sum) {
        for (uint256 i = 0; i < array.length; ) {
            sum += array[i];
            unchecked {
                ++i;
            }
        }

        return sum;
    }
}
```

```solidity
// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.15;

contract OptimizedArraySum {
    uint256[] array;

    function setArray(uint256[] memory _array) external {
        require(_array.length <= 10, "too long");
        array = _array;
    }

    // Optimized getArraySum function
    function getArraySum() external view returns (uint256 sum) {
        // The loop condition is modified to remove the increment operation from here.
        // This is because the increment operation is moved inside the loop body.
        for (uint256 i = 0; i < array.length; ) {
            // The sum of the array elements is calculated inside the loop condition.
            // This reduces the number of times the state variable `array` is accessed,
            // which saves gas because accessing a state variable is a costly operation.
            sum += array[i];

            // The `unchecked` keyword is used to disable overflow checks for the increment operation.
            // Overflow checks are costly in terms of gas, so disabling them can save gas.
            // This is safe because the loop condition ensures that `i` will never overflow.
            unchecked {
                ++i;
            }
        }

        return sum;
    }
```
