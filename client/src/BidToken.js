import React, { useState, useEffect } from 'react'
import './BidToken.css'
import {
  Link,
  useHistory,
} from 'react-router-dom'
import Auction from './contracts/Auction.json'
import Web3 from 'web3'

function BidToken(props) {
  const history = useHistory()
  const [roundNumber, setRoundNumber] =
    useState(1)
  const [bid, setBid] = useState(0)
  const [extra, setExtra] = useState(0)
  const [hashCode, setHashCode] = useState('')

  const [refresh, setrefresh] = useState(0)
  const [currentAccount, setCurrentaccount] =
    useState('')
  const [loader, setLoader] = useState(true)
  const [auction, setAuction] = useState({})

  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    } else if (window.web3) {
      window.web3 = new Web3(
        window.web3.currentProvider
      )
    } else {
      window.alert(
        'Non-ethereum browser detected. Please install Metamask extension.'
      )
    }
  }

  const web3 = window.web3

  /* const id_network = web3.eth.net.getId()
  const data_network =
    Auction.networks[id_network] */

  const loadBlockchainData = async () => {
    setLoader(true)
    // const web3 = window.web3

    const accounts = await web3.eth.getAccounts()
    const account = accounts[0]
    setCurrentaccount(account)

    const networkId = await web3.eth.net.getId()

    const networkData =
      Auction.networks[networkId]

    const auctions = new web3.eth.Contract(
      Auction.abi,
      networkData.address
    )
    console.log(auctions)

    // var auctionEvent = auctions.at(networkData.address)
    // console.log(auctionEvent);

    // setAuction(auctionEvent)

    if (networkData) {
      /* const ownerId = await auctions.methods.owner.call();
        console.log(ownerId);
        const auctioneerId = await auctions.methods.auctioneer.call();
        console.log(auctioneerId);
        const minimumBid = await auctions.methods.minimumBid.call();
        console.log(minimumBid); */

      setAuction(auctions)
      setLoader(false)
    } else {
      window.alert(
        'Smart contract is not deployed to current network'
      )
    }
  }

  useEffect(() => {
    loadWeb3()
    loadBlockchainData()

    if (refresh === 1) {
      setrefresh(0)
      loadBlockchainData()
    }
  }, [refresh])

  function round_Number() {
    // const number = e.target.value;
    setRoundNumber((number) => number + 1)
    console.log(roundNumber)
  }

  async function getHashCode(event) {
    setBid(event.target.value)
  }

  // var event = auction.GetBlindBid();

  async function generateHash() {
    console.log(bid)

    await auction.methods
      .generateBlindedBidBytes32(bid)
      .send({
        value: bid.toString(),
        from: currentAccount,
        gas: 23000,
      })
      .on('transactionHash', function (hash) {
        console.log(hash)
      })
      .on(
        'confirmation',
        function (confirmationNumber, receipt) {
          console.log('confirm')
        }
      )
      .on('receipt', function (receipt) {
        // receipt example
        console.log(receipt)
      })

    // await auction.methods
    //   .getBlindedBidBytes32()
    //   .call()
    //   .then(console.log)

    //     var options = {
    //     fromBlock: 0,
    //     address: web3.eth.currentAccount,
    //     topics: ["0x0000000000000000000000000000000000000000000000000000000000000000", null, null]
    // };
    // web3.eth.subscribe('logs', options, function (error, result) {
    //     if (!error)
    //         console.log(result);
    // })
    //     .on("data", function (log) {
    //         console.log(log);
    //     })
    //     .on("changed", function (log) {
    // });

    // event.watch(function(error, result){
    //   if(!error){
    //     console.log(result);
    //   }
    // })
  }

  /* const hashcode = auction.events
      .generatesBlindBid(
        {},
        function (error, event) {
          console.log(event)
        }
      ) 

  .on('connected', function (subscriptionId) {
        console.log(subscriptionId)
      })
      .on('data', function (event) {
        console.log(event) // same results as the optional callback above
      })
      .on('changed', function (event) {
        // remove event from local database
        console.log('removed')
      })
      .on('error', function (error, receipt) {
        // If the transaction was rejected by the network with a receipt, the second parameter will be the receipt.
        console.log('error')
      })

    console.log(hashcode); */
  // setHashCode(hashcode);
  // console.log(hashCode);

  /* await auction.methods
      .generateBlindedBidBytes32(bid)
      .send({ from: currentAccount, gas: 23000 })
      .on('transactionHash', function (hash) {
        console.log(hash)
      })
      .on(
        'confirmation',
        function (confirmationNumber, receipt) {
          console.log('confirm')
        }
      )
      .on('receipt', function (receipt) {
        // receipt example
        console.log(receipt)
      })
  } */

  /* async function getDummy() {
    await auction.methods
      .returndummy()
      .call({
        from: '0x7685F13e86286bDE9a2F8B451C8E5F903EFD205D',
      })
      .then(console.log)
  } */

  async function getHash() {
    console.log(hashCode)
    // setHashCode('xshhakj')
    await auction.methods
      .gettBlindedBidBytes32()
      .call()
      .then(console.log)
  }
  // .then(console.log)
  // .then(console.log)
  /* console.log(hashbid = () => {
        setHashCode(hashbid)
        console.log(hashCode) 
    console.log(web3.utils.isHexStrict(hashCode))
  } ) */

  /* async function getHash() {
    
  } */

  // setHashCode(hashcode);

  async function depositBid() {
    try {
      console.log(bid)
      const a = await auction.methods
        .bid(hashCode)
        .send({
          from: currentAccount,
          gas: 23000,
        })
        .on('transactionHash', function () {
          console.log('Hash')
        })
        .on('receipt', function () {
          console.log('Receipt')
        })
        .on('confirmation', function () {
          // const confirm = "Confirmed";
          console.log('Confirmed')
        })
        .on('error', async function () {
          console.log('Error')
        })
      console.log(a)
    } catch (error) {
      console.log(error)
    }
  }

  async function extra_bid(event) {
    setExtra(event.target.value)
  }

  async function extraBid() {
    console.log(extra)
  }

  /* async function deposit_bid(amount) {
        await auction.methods.bid(hashCode)
        .send({from: currentAccount, gas:23000})

    } */

  // console.log(roundNumber);
  return (
    <div className='bid_info'>
      <h3 className='round_number'>
        Round Number: {roundNumber}{' '}
      </h3>
      <br />

      <h3 className='place_bid_info'>
        Place Bid
      </h3>

      <div className='hash_info'>
        <input
          onChange={getHashCode}
          type='value'
          placeholder='Bid value..'
        />
        <button
          onClick={generateHash}
          type='submit'
          required
          className='generate_hash'
        >
          Submit bid
        </button>
        <br />
        <button
          onClick={getHash}
          type='submit'
          required
          className='get_hash'
        >
          Generate Hash
        </button>

        <div className='hash_value'>
          {hashCode} <br /> --put your hash value
          below--
        </div>
      </div>
      <br />
      <div className='transaction'>
        <input
          type='text'
          placeholder='Hash value..'
        />
        <button
          type='submit'
          onClick={depositBid}
          required
          className='bid_transaction'
        >
          Transact bid amount
        </button>

        <div className='transaction_result'>
          success
        </div>
      </div>

      <h3 className='waiting_info'>Reveal Bid</h3>
      <div className='waiting_info'>
        Wait for xx seconds before revealing your
        bid:
      </div>
      <br />
      <div className='reveal_bid'>
        <input
          type='text'
          placeholder='What was your extra bid?..'
          onChange={extra_bid}
        />
        <button
          required
          type='submit'
          className='reveal_bid'
          onClick={extraBid}
        >
          Get extra bid refunded
        </button>
        <br />
        <div className='reveal_result'>
          -Refunded-
        </div>
      </div>
      <div className='user_bid_info'>
        --your total bid is xx--
      </div>
      <div className='highest_bid_info'>
        --highest bid is xx--
      </div>
      <br />
      <div className='withdraw'>
        <button
          required
          type='submit'
          className='withdraw_btn'
        >
          Withdraw
        </button>
        <button
          required
          type='submit'
          onClick={round_Number}
          className='next_round_btn'
        >
          Next round
        </button>
      </div>
    </div>
  )
}

export default BidToken
