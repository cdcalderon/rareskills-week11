### Puzzle 10

```assembly
#############
# Puzzle 10 #
#############

00      38          CODESIZE
01      34          CALLVALUE
02      90          SWAP1
03      11          GT
04      6008        PUSH1 08
06      57          JUMPI
07      FD          REVERT
08      5B          JUMPDEST
09      36          CALLDATASIZE
0A      610003      PUSH2 0003
0D      90          SWAP1
0E      06          MOD
0F      15          ISZERO
10      34          CALLVALUE
11      600A        PUSH1 0A
13      01          ADD
14      57          JUMPI
15      FD          REVERT
16      FD          REVERT
17      FD          REVERT
18      FD          REVERT
19      5B          JUMPDEST
1A      00          STOP
```

- Target => Index 08 (8) first then we need to get to index 19 (25) where 'JUMPDEST' is located

The conditions that need to be satisfied are:

1. `GT(CALLVALUE, CODESIZE)` must return 1, where `CODESIZE` is 27 (0x1b in hex). This means that `CALLVALUE` must be less than or equal to 27.
2. `ADD(0A, CALLVALUE)` must return 19 (0x13 in hex). The only possible value for this is `CALLVALUE` equal to 15 (0x0F in hex).
3. `ISZERO(MOD(0x0003, CALLDATASIZE))` must return 1, which means that the size of our `CALLDATA` must be a multiple of 3.

A possible solution could be:

- `CALLVALUE = 15` (0x0F in hex)
- `CALLDATA = 0xFFFFFF`

This solution means that you send 15 Ether (or any other unit of value) to the contract and provide `0xFFFFFF` as the data for the transaction.
