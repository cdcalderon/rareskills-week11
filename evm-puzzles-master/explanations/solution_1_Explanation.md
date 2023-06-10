# evm-puzzles Source: <https://github.com/fvictorio/evm-puzzles>

## Solutions

A collection of EVM puzzles. Each puzzle consists on sending a successful transaction to a contract. The bytecode of the contract is provided, and you need to fill the transaction data that won't revert the execution.

### Puzzle 1

```assembly
############
# Puzzle 1 #
############

00      34      CALLVALUE
01      56      JUMP
02      FD      REVERT
03      FD      REVERT
04      FD      REVERT
05      FD      REVERT
06      FD      REVERT
07      FD      REVERT
08      5B      JUMPDEST
09      00      STOP
```

Here is what each of these instructions does:

- `CALLVALUE`: This operation pushes the value of the call (i.e., the amount of Ether in wei sent with the transaction) onto the stack.
- `JUMP`: This operation pops an item from the stack and attempts to jump to that instruction in the code. If the jump is not valid, the transaction is reverted.
- `REVERT`: This operation stops execution and reverts all changes, returning any remaining gas to the caller.
- `JUMPDEST`: This operation is the destination of a `JUMP` or `JUMPI` operation.
- `STOP`: This operation halts execution.

The trick here is in how the `JUMP` operation works. The `JUMP` operation will take the value on the stack (which is the value of the call, put there by the `CALLVALUE` operation), and try to jump to that instruction in the code.

To solve the puzzle, send a transaction with a value of 8 wei. This will cause the program to jump to the JUMPDEST instruction and then stop, successfully completing the puzzle without any reversion.

If you send a transaction with a value other than 8 wei, the transaction will fail. So, to solve the puzzle, your transaction should carry exactly 8 wei.
