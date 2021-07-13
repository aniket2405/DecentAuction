const Auction = artifacts.require('Auction')

module.exports = function (deployer) {
  deployer.deploy(
    Auction,
    '0x327183B59a4E769A08379dF111E44dB2d0EfE242',
    1,
    '0x6278735670b58aD93Ee1F2B9157b95AAA7395b47'
  )
}
