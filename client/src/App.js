import React, { useEffect, useState } from 'react';
import './App.css';
import Web3 from 'web3';
import Auction from './contracts/Auction.json';
import Navbar from './Navbar';

function App() {

  const [refresh, setrefresh] = useState(0);
  const [currentAccount, setCurrentaccount] = useState("");
  const [loader, setLoader] = useState(true);
  const [auction, setAuction] = useState();

  const loadWeb3 = async () => {
    if(window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-ethereum browser detected. Please install Metamask extension."
      );
    }
  };

  const loadBlockchainData = async () => {
    setLoader(true);
    const web3 = window.web3;

    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];
    setCurrentaccount(account);

    const networkId = await web3.eth.net.getId();

    const networkData = Auction.networks[networkId];

    if(networkData) {
        const auctions = new web3.eth.Contract(Auction.abi, networkData.address);
        setAuction(auctions);
        setLoader(false);
    } else {
      window.alert("Smart contract is not deployed to current network");
    }
  }

   useEffect(() => {
    loadWeb3();
    loadBlockchainData();

    if (refresh === 1) {
      setrefresh(0);
      loadBlockchainData();
    }

   }, [refresh]);

   if(loader) {
     return <div>loading..</div>
   }

  return (
    <div className="App">
    <div className="Navbar">
    <Navbar account={currentAccount}/>
    </div>
      <h4>Put your NFTs for auction and get the justified price for them with a unique SMRA-based auction system</h4>
      
    </div>
  );
}

export default App;
