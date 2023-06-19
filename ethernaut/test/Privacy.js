// const { expect } = require("chai");
// const { ethers } = require("hardhat");

// let accounts;
// let eoa;
// let challenge; // challenge contract
// let tx;

// before(async () => {
//   accounts = await ethers.getSigners();
//   eoa = accounts[0];
//   const challengeFactory = await ethers.getContractFactory("Privacy");

//   // Provide the correct arguments for the constructor in the deploy() function
//   const data = [
//     ethers.utils.formatBytes32String("arg1"),
//     ethers.utils.formatBytes32String("arg2"),
//     ethers.utils.formatBytes32String("arg3"),
//   ];
//   challenge = await challengeFactory.deploy(data);
//   await challenge.deployed();
// });

// it("solves the challenge", async function () {
//   // storage is allocated to slots like this:
//   // https://docs.soliditylang.org/en/v0.6.8/internals/layout_in_storage.html
//   // 0: locked
//   // 1: ID
//   // 2: flattening, denomination, awkwardness (storage can be packed into a 256 bit slot)
//   // 3: data[0] (because **fixed** size array)
//   // 4: data[1]
//   // 5: data[2]
//   const storageSlots = [0, 1, 2, 3, 4, 5, 6];
//   for (const slot of storageSlots) {
//     const slotData = await eoa.provider.getStorageAt(challenge.address, slot);
//     console.log(
//       `${slot}:\t ${slotData} (${ethers.BigNumber.from(slotData).toString()})`
//     );
//   }

//   console.log(`Printing data static array`);
//   for (const slot of [0, 1, 2]) {
//     const slotData = await eoa.provider.getStorageAt(
//       challenge.address,
//       3 + slot
//     );
//     console.log(
//       `data[${slot}]:\t ${slotData} (${Buffer.from(
//         slotData.slice(2),
//         `hex`
//       ).toString(`utf8`)})`
//     );
//   }

//   const keyData = await eoa.provider.getStorageAt(
//     challenge.address,
//     5 /* data[2] */
//   );
//   // seems to take the most significant bits data[2][0..15] when doing bytes16(data[2])
//   const key16 = `${keyData.slice(0, 34)}`; // bytes16 = 16 bytes
//   tx = await challenge.unlock(key16);
//   await tx.wait();
// });

// after(async () => {
//   // Check if the challenge contract is defined before trying to access it
//   if (challenge) {
//     expect(await challenge.locked(), "level not solved").to.be.false;
//   }
// });
