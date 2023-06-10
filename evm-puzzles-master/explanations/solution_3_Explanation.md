### Puzzle 3

```assembly
############
# Puzzle 3 #
############

00      36      CALLDATASIZE
01      56      JUMP
02      FD      REVERT
03      FD      REVERT
04      5B      JUMPDEST
05      00      STOP
```

Here is what each of these instructions does:

- `CALLDATASIZE` pushes the size of the input data (calldata) in bytes onto the stack.
- `JUMP` pops an item from the stack and jumps to that instruction in the code. If the jump is not valid, the transaction is reverted.
- `REVERT` stops execution and reverts all changes, returning any remaining gas to the caller.
- `JUMPDEST` is the destination of a `JUMP` operation.
- `STOP` halts execution.

In this puzzle, the `CALLDATASIZE` operation pushes the size of the calldata onto the stack. The `JUMP` operation then tries to jump to the instruction at the position equal to the size of the calldata.

To solve this puzzle, you need to provide calldata of a size that matches the position of the `JUMPDEST` operation. The position of `JUMPDEST` is 4 (starting from 0), so the calldata should be 4 bytes in size. You can create 4-byte calldata by providing any 4-byte value, for example, `0x00000000`.

If the size of the calldata is different from 4, the `JUMP` operation will try to jump to a different position in the code, which contains the `REVERT` operation, so the transaction will be reverted.

Therefore, to solve this puzzle, you need to send a transaction with calldata of 4 bytes, such as `0x00000000` or `0x01010101` will do.
