### Puzzle 8

```assembly
############
# Puzzle 8 #
############

00      36        CALLDATASIZE
01      6000      PUSH1 00
03      80        DUP1
04      37        CALLDATACOPY
05      36        CALLDATASIZE
06      6000      PUSH1 00
08      6000      PUSH1 00
0A      F0        CREATE
0B      6000      PUSH1 00
0D      80        DUP1
0E      80        DUP1
0F      80        DUP1
10      80        DUP1
11      94        SWAP5
12      5A        GAS
13      F1        CALL
14      6000      PUSH1 00
16      14        EQ
17      601B      PUSH1 1B
19      57        JUMPI
1A      FD        REVERT
1B      5B        JUMPDEST
1C      00        STOP
```

- Target => Index 1c (28) where 'JUMPDEST' is located

The goal of this puzzle is to reach the JUMPDEST opcode at index 1B. To do this, the smart contract must be created such that a call to it returns 0, which indicates a failure. This is because after the call, the return value is checked for equality with 0 (EQ opcode at index 16), and if they are equal, the execution jumps to the JUMPDEST opcode (JUMPI opcode at index 19).

The opcode `0x60FD6000526001601ff3` is an EVM bytecode that causes a smart contract to revert when called, thus returning 0.

Here's a breakdown of the `0x60FD6000526001601ff3` opcode:

- `60` (PUSH1): Push the next byte to the stack. The next byte is `FD`.
- `FD` (REVERT): Stop execution and revert state changes, but return data and remaining gas to the caller. This opcode will cause the contract call to return 0.
- `60` (PUSH1), `00` (value 00): Push 0 to the stack.
- `52` (MSTORE): Pop the top two words from the stack and store the second at the address given by the first.
- `60` (PUSH1), `01` (value 01): Push 1 to the stack.
- `60` (PUSH1), `1f` (value 1f): Push 31 to the stack.
- `f3` (RETURN): Halt execution and return output data.

When you pass in a value of `0x60FD6000526001601ff3` as calldata, it will create a smart contract that reverts when called, causing the CALL opcode to push 0 to the stack, and thus solving the puzzle.
