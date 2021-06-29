const Auction = artifacts.require("Auction")

module.exports = function (deployer) {
  deployer.deploy(
    Auction,
    '0x284c2390B5634C94426cDBF2623947721BE7E462',
    10,
    '0xBB3dd645c3adBfA5F0D7f4AFC5B15319819D8D75'  
  )
}
