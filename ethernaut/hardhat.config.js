require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    compilers: [
      // old ethernaut compilers
      { version: "0.8.9" },
      { version: "0.8.0" },
      { version: "0.7.3" },
    ],
  },
};
