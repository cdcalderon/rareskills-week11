### Puzzle 9

```assembly
############
# Puzzle 9 #
############

00      36        CALLDATASIZE
01      6003      PUSH1 03
03      10        LT
04      6009      PUSH1 09
06      57        JUMPI
07      FD        REVERT
08      FD        REVERT
09      5B        JUMPDEST
0A      34        CALLVALUE
0B      36        CALLDATASIZE
0C      02        MUL
0D      6008      PUSH1 08
0F      14        EQ
10      6014      PUSH1 14
12      57        JUMPI
13      FD        REVERT
14      5B        JUMPDEST
15      00        STOP
```

- Target => Index 09 (9) first then we need to get to index 14 (20) where 'JUMPDEST' is located

The EVM code for Puzzle 9 checks two conditions:

1. The size of the transaction's calldata is less than 3.
2. The multiplication of the calldata size and the transaction's value is equal to 8.

To pass the first condition, we need to make sure that the calldata size is less than 3. An easy way to do this is to set the calldata to `0x00000000`, which has a size of 0.

The second condition is a bit trickier. It requires that the multiplication of the calldata size and the transaction's value is equal to 8. However, since our calldata size is 0, this multiplication will always result in 0, regardless of the transaction's value. But, since the calldata is 0, this multiplication never happens and the code will jump to the stop opcode.
