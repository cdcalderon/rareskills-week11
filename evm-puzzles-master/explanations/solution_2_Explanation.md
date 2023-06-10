# evm-puzzles Source: <https://github.com/fvictorio/evm-puzzles>

### Puzzle 2

```assembly
############
# Puzzle 2 #
############

00      34      CALLVALUE
01      38      CODESIZE
02      03      SUB
03      56      JUMP
04      FD      REVERT
05      FD      REVERT
06      5B      JUMPDEST
07      00      STOP
08      FD      REVERT
09      FD      REVERT
```

- Target => Index 06 where 'JUMPDEST' is located

Here is what each of these instructions does:

- `CALLVALUE`: This operation pushes the value of the call (i.e., the amount of Ether in wei sent with the transaction) onto the stack.
- `CODESIZE`: This operation pushes the size of the contract's code onto the stack.
- `SUB`: This operation pops two items from the stack, subtracts the second one from the first one, and pushes the result back onto the stack.
- `JUMP`: This operation pops an item from the stack and attempts to jump to that instruction in the code. If the jump is not valid, the transaction is reverted.
- `REVERT`: This operation stops execution and reverts all changes, returning any remaining gas to the caller.
- `JUMPDEST`: This operation is the destination of a `JUMP` or `JUMPI` operation.
- `STOP`: This operation halts execution.

The trick here is again with the `JUMP` operation. The `CALLVALUE` and `CODESIZE` operations push two values onto the stack, and then the `SUB` operation subtracts the second one (the code size) from the first one (the call value). The `JUMP` operation then tries to jump to the instruction at the position equal to the result of this subtraction.

The `CODESIZE` operation will push 10 onto the stack, because there are 10 instructions in the contract's code. This means that to solve the puzzle, you need to send a transaction with a value such that `value - 10` equals the position of the `JUMPDEST` operation. The position of `JUMPDEST` is 6 (starting from 0), so the value you need to send is `6 + 4 = 10`.

However, the correct solution is to send a transaction with a value of 4 wei. This is because the `SUB` operation subtracts the code size (10) from the transaction value (4), resulting in -6. When the `JUMP` operation pops this value from the stack, it treats it as an unsigned integer, effectively turning it into 6, which is the position of the `JUMPDEST` operation.

So, to solve this puzzle, you need to send a transaction with a value of 4 wei. If you send this transaction, the `CALLVALUE` operation will push 4 onto the stack, the `CODESIZE` operation will push 10 onto the stack, the `SUB` operation will subtract 10 from 4 and push -6 (interpreted as 6) onto the stack, and then the `JUMP` operation will jump to the `JUMPDEST` operation. The `STOP` operation will then be executed, halting execution successfully without reverting.

If you send a transaction with a value other than 4 wei, the result of the `SUB` operation will be different from 6, and the `JUMP` operation will try to jump to a different position in the code, which contains the `REVERT` operation, so the transaction will be reverted.
