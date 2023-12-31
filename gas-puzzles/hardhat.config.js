require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    compilers: [
      // old ethernaut compilers
      { version: "0.8.18" },
      { version: "0.8.15" },
      { version: "0.8.5" },
      { version: "0.8.0" },
      { version: "0.7.3" },
    ],
  },
};
