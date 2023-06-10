# Understanding Storage Layout

Before we can solve the challenge, we need to understand how Solidity lays out state variables in storage. Each slot in storage can hold up to 32 bytes. Solidity tries to pack smaller state variables together into the same slot to save space. However, certain types like arrays and structs always start in a new slot.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Privacy {

  // This bool variable takes up 1 byte and is stored in storage slot 0
  bool public locked = true;

  // This uint256 variable takes up 32 bytes and is stored in storage slot 1
  uint256 public ID = block.timestamp;

  // These three variables together take up 4 bytes and are stored in storage slot 2
  uint8 private flattening = 10;
  uint8 private denomination = 255;
  uint16 private awkwardness = uint16(block.timestamp);

  // This array starts in a new storage slot. The first entry is in slot 3, the second in slot 4, and the third in slot 5
  bytes32[3] private data;

  constructor(bytes32[3] memory _data) {
    data = _data;
  }

  // This function unlocks the contract if the provided key matches the third entry in the data array
  function unlock(bytes16 _key) public {
    require(_key == bytes16(data[2])); // The third entry in the data array is cast to bytes16 before the comparison
    locked = false; // If the key matches, the contract is unlocked
  }

  /*
    A bunch of super advanced solidity algorithms...

      ,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`
      .,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,
      *.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^         ,---/V\
      `*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.    ~|__(o.o)
      ^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'  UU  UU
  */
}
```

# Reading from Storage

Now that we know where the third entry in the data array is stored, we can read it directly from storage. We can do this using the web3.eth.getStorageAt function. This function takes the contract address and the storage slot as arguments and returns the data stored in that slot.

# Truncating the Key

The unlock function expects a 16-byte input, but the key we read from storage is 32 bytes. So, we need to truncate the key to 16 bytes before we can use it. We can do this by slicing the first 16 bytes from the key.

# Unlocking the Contract

Finally, we can call the unlock function with the truncated key to unlock the contract. If we did everything correctly, the locked state variable should now be false.
