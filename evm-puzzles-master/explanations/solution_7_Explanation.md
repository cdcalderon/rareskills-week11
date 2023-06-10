### Puzzle 7

```assembly
############
# Puzzle 7 #
############

00      36        CALLDATASIZE
01      6000      PUSH1 00
03      80        DUP1
04      37        CALLDATACOPY
05      36        CALLDATASIZE
06      6000      PUSH1 00
08      6000      PUSH1 00
0A      F0        CREATE
0B      3B        EXTCODESIZE
0C      6001      PUSH1 01
0E      14        EQ
0F      6013      PUSH1 13
11      57        JUMPI
12      FD        REVERT
13      5B        JUMPDEST
14      00        STOP
```

- Target => Index 14 (20) where 'JUMPDEST' is located

# Solution for Puzzle 7

The seventh puzzle introduces `CALLDATASIZE`, `CALLDATACOPY`, `CREATE`, `EXTCODESIZE`. It is marked as a tricky exercise.

Here is what each of these instructions does:

- `CALLDATASIZE`: Pushes the byte size of the `calldata` value to the stack.
- `PUSH1 00`: Pushes the number 0 to the stack.
- `DUP1`: Duplicates the top stack item (0).
- `CALLDATACOPY`: Takes three parameters from the stack: the starting position in the calldata, the starting position in the contract's memory, and the number of bytes to copy. In this case, it saves the `calldata` at destination offset 0 and offset 0, and it has the size of `calldata` through `CALLDATASIZE`.
- `CALLDATASIZE`: Pushes the byte size of the `calldata` value to the stack again.
- Two `PUSH1 00` opcodes: Pushes the number 0 to the stack twice.
- `CREATE`: Creates a new contract and enters a new sub context of the calculated destination address. It also executes the provided initialisation code, then resumes the current context.
- `EXTCODESIZE`: Takes a 20-byte address of the contract to query as an argument and pushes the byte size of the contract to the stack.
- `PUSH1 01` and `EQ`: Checks for equality and pushes 0 or 1 (false or true) to the stack depending on the outcome.
- `PUSH1 13` and `JUMPI`: Only jumps to the location (top of the stack) if the value after that is truthy (not 0).

The goal is to successfully create a contract with the `CREATE` opcode where the contract's byte size == 1. This will result in a 1 at the stack after pushing the 13 (destination) and the `JUMPI` opcode will jump to the desired `JUMPDEST`.

To solve this puzzle, you need to pass in any `calldata` that consists of an opcode that effectively returns 1 when being deployed, e.g., `6001` (`PUSH1 01`).

Here is the `calldata` that would return 1 when being deployed:

- `6001` : `PUSH1 01` - This opcode pushes the number 1 onto the stack.
- `6000` : `PUSH1 00` - This opcode pushes the number 0 onto the stack.
- `52` : `MSTORE` - This opcode stores the first value in the memory at the address given by the second value. So, it stores 1 at the memory address 0.
- `6001` : `PUSH1 01` - This opcode pushes the number 1 onto the stack. This is the size of the memory we want to return.
- `601f` : `PUSH1 1f` - This opcode pushes the number 31 (1f in hexadecimal) onto the stack. This is the offset in memory from which we want to return data. We stored the 1 in the first byte of memory, but because `RETURN` operates on words (32 bytes), we need to return starting from the 31st byte to get our single byte of data.
- `f3` : `RETURN` - This opcode halts execution returning output data. In this case, it will return the one byte of data we have set in memory.

So, if you pass in a value of `0x60016000526001601ff3`, the `JUMPI` will land on `JUMPDEST` and you will successfully finish the seventh puzzle.

The value `0x60016000526001601ff3` is a set of opcodes in the EVM bytecode that is used as input data for the contract. The goal is to generate a contract of size one when the `CREATE` opcode is used. Let's break down this value:

So, when this `calldata` is used, the `CREATE` opcode creates a contract with the bytecode `0x60016000526001601ff3`, which, when deployed, results in a contract of size one (as it only returns a single byte). Because the `EXTCODESIZE` opcode returns a size of one for this contract, the equality check with `EQ` results in true, causing the `JUMPI` to jump to the `JUMPDEST`, successfully completing the puzzle.
